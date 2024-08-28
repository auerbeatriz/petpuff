import { DataBaseConnection } from "../config/typeorm";
import { AndamentoPedido } from "../entities/AndamentoPedido";
import { Pedido } from "../entities/Pedido";
import { EtapaPedido } from "../types/enums";
import { ClienteRepository } from "./ClienteRepository";
import { OrcamentoRepository } from "./OrcamentoRepository";

export class PedidoRepository {
    static repository = DataBaseConnection.getRepository(Pedido)

    static async criar(valorTotal: number, clienteId: number): Promise<Pedido> {
        const response = this.repository.create({
            dataRealizacao: new Date(),
            valorTotal,
            cliente: {
                id: clienteId
            }
        })

        await this.repository.save(response)
        return response
    }

    static async get(id: number) {
        return await this.repository.findOneByOrFail({ id })
    }

    static async atualizarAndamento(pedido: Pedido, status: string) {
        const andamentoPedidoRepository = DataBaseConnection.getRepository(AndamentoPedido)

        const response = andamentoPedidoRepository.create({
            dataHoraMudanca: new Date(),
            etapaAtual: EtapaPedido[status as keyof typeof EtapaPedido],
            pedido
        })

        await andamentoPedidoRepository.save(response)
    }
}