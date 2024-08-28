import { DataBaseConnection } from "../config/typeorm";
import { Pagamento } from "../entities/Pagamento";
import { Pedido } from "../entities/Pedido";
import { Pagamento as PagamentoInterface } from "../types/Checkout.interface";

export class PagamentoRepository {
    static repository = DataBaseConnection.getRepository(Pagamento)

    static async criar(pagamento: PagamentoInterface, pedido: Pedido): Promise<Pagamento> {
        const response = this.repository.create({
            data: new Date(),
            valor: pedido.valorTotal,
            metodoPagamento: pagamento.metodoPagamento,
            pedido
        })

        await this.repository.save(response)
        return response
    }
}