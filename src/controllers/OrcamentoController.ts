import { Request, Response } from "express"
import { TamanhoRepository } from "../repositories/TamanhoRepository"
import { KitMaterialRepository } from "../repositories/KitMaterialRepository"
import { PeluciaRepository } from "../repositories/PeluciaRepository"
import { FotoPeluciaRepository } from "../repositories/FotoPeluciaRepository"
import { AtendimentoRepository } from "../repositories/AtendimentoRepository"
import { OrcamentoRepository } from "../repositories/OrcamentoRepository"
import { CommonHelper } from "../helpers/helper"
import { Schema } from "../types/schemas"
import { BadRequestError } from "../types/erros/BadRequestError"
import { CriarOrcamentoPayload } from "../types/CriarOrcamentoPayload"
import { Pelucia } from "../entities/Pelucia"
import { ClienteRepository } from "../repositories/ClienteRepository"
import { KitMaterial } from "../entities/KitMaterial"
import { Tamanho } from "../entities/Tamanho"

export class OrcamentoController {
    async create(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.CRIAR_ORCAMENTO, req.body)

            const input = req.body
            const { id } = req.params

            const cliente = await ClienteRepository.get(Number(id))
            if(!cliente) {
                throw new BadRequestError(`Nenhum cliente associado ao id ${ id }`)
            }

            const pelucia = await this.createPelucia(input)
            const atendimento = await this.createAtendimento(cliente.id)
            const orcamento = await OrcamentoRepository.create(atendimento, pelucia)
            
            res.status(201).json({ numeroOrcamento: orcamento.id })
        } catch(error) {
            const message = 'Não foi possível criar o orçamento.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async getOrcamentosCliente(req: Request, res: Response) {
        try {
            const { id } = req.params
            if(!id) {
                throw new BadRequestError(`Nenhum cliente associado ao id ${ id }`)
            }

            const orcamentos = await OrcamentoRepository.getOrcamentosCliente(Number(id))
            const response = orcamentos.map(orcamento => {
                return {
                    ...orcamento,
                    pelucia: {
                        ...orcamento.pelucia,
                        fotos: orcamento.pelucia.fotos.map(({ url }) => url)
                    }
                }
            })

            res.status(200).json(response)
        } catch(error) {
            const message = 'Não foi possível obter os orçamentos.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async getOrcamento(req: Request, res: Response) {
        try {
            const { id } = req.params
            
            if(!id) {
                throw new BadRequestError(`Nenhum orçamento associado ao id ${ id }`)
            }

            const orcamento = await OrcamentoRepository.getOrcamento(Number(id))
            const { pelucia, pelucia: { tamanho, kitMaterial }, atendimento, orcamentoAnterior } = orcamento
            delete (orcamento as any).atendimento

            const fotos = pelucia.fotos.map(({ url }) => url)
            const valorMinimo = this.getValorMinimo(tamanho, kitMaterial)

            const response = {
                ...orcamento,
                valorMinimo,
                funcionarioResponsavel: atendimento.funcionario?.nome ?? undefined,
                orcamentoAnterior: orcamentoAnterior?.id ??  undefined,
                pelucia: {
                    ...orcamento.pelucia,
                    fotos,
                    tamanho: {
                        nome: tamanho?.nome ?? undefined,
                        altura: tamanho.altura
                    },
                    kitMaterial: kitMaterial ? {
                        nome: kitMaterial.nome,
                        materiais: kitMaterial.materiais.map(material => ({
                            nome: material.nome,
                            descricao: material.descricao
                        })) 
                    } : undefined
                },
                idPedido: orcamento.pedido?.id
            }

            res.status(200).json(response)
        } catch(error) {
            const message = 'Não foi possível obter os orçamentos.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    private async createPelucia(input: CriarOrcamentoPayload): Promise<Pelucia> {
        const tamanho = await TamanhoRepository.create(input.tamanho) 
        const kitMaterial = input.kitMaterialId  ? (await KitMaterialRepository.get(input.kitMaterialId))[0] : undefined

        const pelucia = await PeluciaRepository.create({
            nome: input.nome, 
            detalhes: input.detalhes,
            tamanho, 
            kitMaterial
        })

        await FotoPeluciaRepository.create(input.fotos, pelucia.id)

        return pelucia
    }

    private async createAtendimento(clienteId: number) {
        let atendimento = await AtendimentoRepository.get(clienteId)
        if(atendimento) {
            return atendimento
        }

        return await AtendimentoRepository.create(clienteId)        
    }

    private getValorMinimo(tamanho: Tamanho, kitMaterial: KitMaterial) {
        let valorMinimo

        if(kitMaterial && kitMaterial.precoTamanhoPadrao) {
            if(tamanho.padrao) {
                valorMinimo = kitMaterial.precoTamanhoPadrao.find(obj => obj.id === tamanho.id)?.valor
            } else {
                kitMaterial.precoTamanhoPadrao.sort((a, b) => a.tamanho.altura - b.tamanho.altura)
                valorMinimo = kitMaterial.precoTamanhoPadrao.find(obj => obj.tamanho.altura <= tamanho.altura)?.valor
            }

            return valorMinimo
        }
    }
}