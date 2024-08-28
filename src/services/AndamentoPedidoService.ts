import { PedidoRepository } from "../repositories/PedidoRepository";

export class AndamentoPedidoService {
    async atualizarPedido(status: string, id: number) {
        const pedido = await PedidoRepository.get(id)
        await PedidoRepository.atualizarAndamento(pedido, status)
    }
}