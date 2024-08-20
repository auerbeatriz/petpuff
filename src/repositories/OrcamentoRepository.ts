import { DataBaseConnection } from "../config/typeorm";
import { Atendimento } from "../entities/Atendimento";
import { FotoPelucia } from "../entities/FotoPelucia";
import { Orcamento } from "../entities/Orcamento";
import { Pelucia } from "../entities/Pelucia";
import { StatusOrcamento } from "../types/enums";

export class OrcamentoRepository {
    static repository = DataBaseConnection.getRepository(Orcamento)

    static async create(atendimento: Atendimento, pelucia: Pelucia) {
        const orcamento = this.repository.create({
            dataSolicitacao: new Date(),
            status: StatusOrcamento.NOVO,
            pelucia,
            atendimento
        })

        await this.repository.save(orcamento)

        return orcamento
    }

    static async getOrcamentosCliente(clienteId: number) {
        return await this.repository.find({
            select: {
                id: true,
                numeroOrcamento: true,
                status: true,
                dataSolicitacao: true,
                dataExpiracao: true,
                pelucia: {
                    id: true,
                    nome: true,
                    fotos: {
                        url: true
                    }
                }
            },
            relations: {
                pelucia: {
                    fotos: true
                }
            },
            where: { 
                atendimento: {
                    cliente: { id: clienteId }
                }
            }
        })        
    }
}