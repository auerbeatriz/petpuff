import { DeleteResult, FindOptionsWhere } from "typeorm";
import { DataBaseConnection } from "../config/typeorm";
import { Atendimento } from "../entities/Atendimento";
import { FotoPelucia } from "../entities/FotoPelucia";
import { Orcamento } from "../entities/Orcamento";
import { Pelucia } from "../entities/Pelucia";
import { StatusOrcamento } from "../types/enums";
import { AtualizarOrcamento, ResponderOrcamentoPayload } from "../types/AtualizarOrcamentoPayload";

export class OrcamentoRepository {
    static repository = DataBaseConnection.getRepository(Orcamento)

    static async create(atendimento: Atendimento, pelucia: Pelucia): Promise<Orcamento> {
        const orcamento = this.repository.create({
            dataSolicitacao: new Date(),
            status: StatusOrcamento.NOVO,
            pelucia,
            atendimento
        })

        await this.repository.save(orcamento)

        return orcamento
    }

    static async getOrcamentosCliente(clienteId: number): Promise<Orcamento[]> {
        return await this.repository.find({
            select: {
                id: true,
                numeroOrcamento: true,
                status: true,
                dataSolicitacao: true,
                dataExpiracao: true,
                valor: true,
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

    static async getOrcamento(id: number): Promise<Orcamento> {
        const [ orcamento ] = await this.repository.find({
            where: { id },
            select: {
                numeroOrcamento: true,
                status: true,
                dataSolicitacao: true,
                dataRetorno: true,
                dataExpiracao: true,
                valor: true, 
                prazoConfeccao: true,
                informacoesAdicionais: true,
                orcamentoAnterior: { 
                    id: true 
                },
                pedido: {
                    id: true
                },
                pelucia: {
                    id: true,
                    nome: true,
                    detalhes: true
                },
                atendimento: {
                    id: true,
                    funcionario: {
                        nome: true
                    },
                    cliente: {
                        id: true
                    }
                }
            },
            relations: {
                pelucia: {
                    fotos: true,
                    tamanho: true,
                    kitMaterial: {
                        materiais: true,
                        precoTamanhoPadrao: {
                            tamanho: true
                        }
                    }
                },
                atendimento: {
                    funcionario: true,
                    cliente: true
                },
                pedido: true,
                orcamentoAnterior: true
            }
        })

        return orcamento
    }

    static async getStatusOrcamento(id: number): Promise<Orcamento> {
        return (await this.repository.find({
            where: { id },
            select: { status: true }
        }))[0]
    }

    static async getOrcamentoMinimo(id: number, status?: StatusOrcamento): Promise<Orcamento> {
        const [ orcamento ] = await this.repository.find({
            where: { 
                id,
                status
            },
            select: {
                status: true,
                pelucia: {
                    id: true,
                    fotos: {
                        id: true
                    }
                }
            },
            relations: {
                pelucia: {
                    fotos: true
                }
            }
        })

        return orcamento
    }

    static async responderOrcamento(input: ResponderOrcamentoPayload): Promise<void> {
        const { id, valor, prazoConfeccao, informacoesAdicionais } = input

        let updateClause: AtualizarOrcamento = {
            valor,
            prazoConfeccao,
            informacoesAdicionais
        }

        if(input.updateDates) {
            const today = new Date()
            const dataExpiracao = new Date(today)
            dataExpiracao.setDate(today.getDate() + 15)

            updateClause = {...updateClause, 
                dataRetorno: today,
                dataExpiracao,
                status: StatusOrcamento.RESPONDIDO
            }
        }
        
        await this.repository.update(
            id, 
            updateClause
        )
    }

    static async deleteOrcamento(id: number): Promise<DeleteResult> {
        return await this.repository
        .createQueryBuilder()
        .delete()
        .from(Orcamento)
        .where(`id = ${id} and status = '${ StatusOrcamento.CANCELADO }'`)
        .execute()
    }
}