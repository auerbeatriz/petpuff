import { Request, Response } from "express"
import { CommonHelper } from "../helpers/helper"
import { Schema } from "../types/schemas"
import { BadRequestError } from "../types/erros/BadRequestError"
import { ClienteRepository } from "../repositories/ClienteRepository"
import { OrcamentoService } from "../services/OrcamentoService"

export class OrcamentoController {

    private service

    constructor() {
        this.service = new OrcamentoService()
    }

    async create(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.CRIAR_ORCAMENTO, req.body)

            const input = req.body
            const { id } = req.params

            const cliente = await ClienteRepository.get(Number(id))
            if(!cliente) {
                throw new BadRequestError(`Nenhum cliente associado ao id ${ id }`)
            }

            const orcamento = await this.service.criar({...input, clienteId: Number(id)})
            
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
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            const orcamentos = await this.service.getOrcamentosCliente(Number(id))
            res.status(200).json(orcamentos)
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
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            const orcamento = await this.service.getOrcamento(Number(id))

            res.status(200).json(orcamento)
        } catch(error) {
            const message = 'Não foi possível obter os orçamentos.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async deleteOrcamento(req: Request, res: Response) {
        try {
            const { id } = req.params
            
            if(!id) {
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            await this.service.delete(Number(id))
            res.status(200).json()
        } catch(error) {
            const message = 'Não foi possível fazer a exclusão.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }
}