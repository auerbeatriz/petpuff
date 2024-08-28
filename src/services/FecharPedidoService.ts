import { ClienteRepository } from "../repositories/ClienteRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EntregaRepository } from "../repositories/EntregaRepository";
import { OrcamentoRepository } from "../repositories/OrcamentoRepository";
import { PagamentoRepository } from "../repositories/PagamentoRepository";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { PeluciaRepository } from "../repositories/PeluciaRepository";
import { FecharPedidoPayload } from "../types/Checkout.interface";

export class FecharPedidoService {
    async execute(input: FecharPedidoPayload): Promise<string> {
        const { pelucia, cliente, entrega: { frete, endereco }, pagamento, prazoConfeccao, orcamento } = input

        const valorTotalPedido = pelucia.valorPelucia + frete.valor
        const pedido = await PedidoRepository.criar(valorTotalPedido, Number(cliente.id))

        await ClienteRepository.atualizarEndereco(cliente)
        await PeluciaRepository.atualizarMensagem(pelucia)
        await OrcamentoRepository.aceitar(orcamento, pedido)

        await PagamentoRepository.criar(pagamento, pedido)

        const enderecoEntrega = await EnderecoRepository.criar(endereco)
        await EntregaRepository.criar({ frete, enderecoEntrega, prazoConfeccao, pedido })

        return pedido.id.toString()
    }
}