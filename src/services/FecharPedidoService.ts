import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EntregaRepository } from "../repositories/EntregaRepository";
import { PagamentoRepository } from "../repositories/PagamentoRepository";
import { PedidoRepository } from "../repositories/PedidoRepository";
import { FecharPedidoPayload } from "../types/Checkout.interface";

export class FecharPedidoService {
    async execute(input: FecharPedidoPayload): Promise<string> {
        const { entrega: { frete, endereco }, pagamento, prazoConfeccao } = input

        const valorTotalPedido = input.valorPelucia + frete.valor
        const pedido = await PedidoRepository.criar(valorTotalPedido)

        await PagamentoRepository.criar(pagamento, pedido)

        const enderecoEntrega = await EnderecoRepository.criar(endereco)
        await EntregaRepository.criar({ frete, enderecoEntrega, prazoConfeccao, pedido })

        return pedido.id.toString()
    }
}