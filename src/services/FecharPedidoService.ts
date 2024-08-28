import { ClienteRepository } from "../repositories/ClienteRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EntregaRepository } from "../repositories/EntregaRepository";
import { OrcamentoRepository } from "../repositories/OrcamentoRepository";
import { PagamentoRepository } from "../repositories/PagamentoRepository";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { PeluciaRepository } from "../repositories/PeluciaRepository";
import { FecharPedidoPayload } from "../types/Checkout.interface";
import { StatusOrcamento } from "../types/enums";

export class FecharPedidoService {
    async execute(input: FecharPedidoPayload): Promise<string> {
        const { pelucia, cliente, entrega: { frete, endereco }, pagamento, prazoConfeccao, orcamento } = input

        const valorTotalPedido = pelucia.valorPelucia + frete.valor
        const pedido = await PedidoRepository.criar(valorTotalPedido)

        await ClienteRepository.atualizarEndereco(cliente)
        await PagamentoRepository.criar(pagamento, pedido)
        await PeluciaRepository.atualizarMensagem(pelucia)

        const enderecoEntrega = await EnderecoRepository.criar(endereco)
        await EntregaRepository.criar({ frete, enderecoEntrega, prazoConfeccao, pedido })

        await OrcamentoRepository.atualizarStatus(orcamento, StatusOrcamento.ACEITO)

        return pedido.id.toString()
    }
}