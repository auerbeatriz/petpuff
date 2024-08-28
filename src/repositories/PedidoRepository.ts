import { DataBaseConnection } from "../config/typeorm";
import { Pedido } from "../entities/Pedido";

export class PedidoRepository {
    static repository = DataBaseConnection.getRepository(Pedido)

    static async criar(valorTotal: number): Promise<Pedido> {
        const response = this.repository.create({
            dataRealizacao: new Date(),
            valorTotal
        })

        await this.repository.save(response)
        return response
    }
}