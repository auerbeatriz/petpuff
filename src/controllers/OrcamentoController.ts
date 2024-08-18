import { Request, Response } from "express"
import { TamanhoRepository } from "../repositories/TamanhoRepository"
import { KitMaterialRepository } from "../repositories/KitMaterialRepository"
import { PeluciaRepository } from "../repositories/PeluciaRepository"
import { FotoPeluciaRepository } from "../repositories/FotoPeluciaRepository"
import { AtendimentoRepository } from "../repositories/AtendimentoRepository"
import { OrcamentoRepository } from "../repositories/OrcamentoRepository"
import { CommonHelper } from "../helpers/helper"
import { Schema } from "../types/schemas"
import { BadRequestError } from "../erros/BadRequestError"
import { CriarOrcamentoPayload } from "../types/CriarOrcamentoPayload"
import { Pelucia } from "../entities/Pelucia"
import { ClienteRepository } from "../repositories/ClienteRepository"

export class OrcamentoController {
    async create(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.CRIAR_ORCAMENTO, req.body)

            const input = req.body
            const { clienteId } = req.params

            const cliente = await ClienteRepository.get(Number(clienteId))
            if(!cliente) {
                throw new BadRequestError(`Nenhum cliente associado ao id ${ clienteId }`)
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

    private async createPelucia(input: CriarOrcamentoPayload): Promise<Pelucia> {
        const tamanho = await TamanhoRepository.create(input.tamanho) 
        const kitMaterial = input.kitMaterialId  ? (await KitMaterialRepository.get(input.kitMaterialId))[0] : undefined

        const pelucia = await PeluciaRepository.create({
            nome: input.nome, 
            detalhes: input.detalhes,
            tamanho, 
            kitMaterial
        })

        console.log(pelucia)

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
}