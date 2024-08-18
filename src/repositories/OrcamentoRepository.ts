import { DataBaseConnection } from "../config/typeorm";
import { Atendimento } from "../entities/Atendimento";
import { Orcamento } from "../entities/Orcamento";
import { Pelucia } from "../entities/Pelucia";
import { StatusOrcamento } from "../types/enums";

export class OrcamentoRepository {
    static repository = DataBaseConnection.getRepository(Orcamento)

    static async create(atendimento: Atendimento, pelucia: Pelucia) {
        const orcamento = this.repository.create({
            dataSolicitacao: new Date().toISOString(),
            status: StatusOrcamento.NOVO,
            pelucia,
            atendimento
        })

        await this.repository.save(orcamento)

        return orcamento
    }
}