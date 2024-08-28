import { Request, Response } from "express"
import { CommonHelper } from "../helpers/helper"
import { Schema } from "../types/schemas"
import { BadRequestError } from "../types/erros/BadRequestError"
import { ClienteRepository } from "../repositories/ClienteRepository"
import { OrcamentoService } from "../services/OrcamentoService"
import { PeluciaService } from "../services/PeluciaService"

export class OrcamentoController {

    private orcamentoService
    private peluciaService

    constructor() {
        this.orcamentoService = new OrcamentoService()
        this.peluciaService = new PeluciaService()
    }

    async create(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.CRIAR_ORCAMENTO, req.body)
            const input = req.body
            const clienteId = Number(input.clienteId)

            const cliente = await ClienteRepository.get(clienteId)
            if(!cliente) {
                throw new BadRequestError(`Nenhum cliente associado ao id ${ clienteId }`)
            }
            
            const pelucia = await this.peluciaService.criarPelucia(input)
            const orcamento = await this.orcamentoService.criar(clienteId, pelucia)
            
            res.status(201).json({ numeroOrcamento: orcamento.id })
        } catch(error) {
            const message = 'Não foi possível criar o orçamento.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async reabrirOrcamento(req: Request, res: Response) {
        try {
            const { id } = req.params
            if(!id) {
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            const payload = await this.orcamentoService.reabrirOrcamento(Number(id))

            const pelucia = await this.peluciaService.criarPelucia(payload)
            const orcamento = await this.orcamentoService.criar(payload.clienteId, pelucia, payload.idOrcamentoAnterior)

            res.status(201).json({"id": orcamento.id})
        } catch(error) {
            const message = 'Não foi possível atualizar a pelúcia.'
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

            const orcamentos = await this.orcamentoService.getOrcamentosCliente(Number(id))
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

            const orcamento = await this.orcamentoService.getOrcamento(Number(id))

            res.status(200).json(orcamento)
        } catch(error) {
            const message = 'Não foi possível obter os orçamentos.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async atenderOrcamento(req: Request, res: Response) {
        try {
            // todo: add authorization for funcionarios
            const { idFuncionario } = req.body
            const { id } = req.params

            if(!id) {
                throw new BadRequestError(`id inválido: ${id}`)
            }

            if(!idFuncionario) {
                throw new BadRequestError(`id inválido: ${id}`)
            }
            
            await this.orcamentoService.atenderOrcamento(Number(id), Number(idFuncionario))
            res.status(204).json()
        } catch(error) {
            const message = 'Não foi possível atualizar o orçamento.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async responderOrcamento(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.RESPONDER_ORCAMENTO, req.body)
           
            const input = req.body
            const { id } = req.params
            
            if(!id) {
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            await this.orcamentoService.responderOrcamento({...input, id: Number(id)})
            res.status(204).json()
        } catch(error) {
            const message = 'Não foi possível responder o orçamento.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }

    async atualizarPelucia(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.ATUALIZAR_PELUCIA, req.body)
           
            const input = req.body
            const { id } = req.params
            
            if(!id) {
                throw new BadRequestError(`Parâmetro inválido; id: ${ id }`)
            }

            await this.peluciaService.atualizar(Number(id), input)
            res.status(204).json()
        } catch(error) {
            const message = 'Não foi possível atualizar a pelúcia.'
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

            const {idPelucia, fotos } = await this.orcamentoService.delete(Number(id))
            await this.peluciaService.delete(idPelucia, fotos)

            res.status(204).json()
        } catch(error) {
            const message = 'Não foi possível fazer a exclusão.'
            const status = (error instanceof BadRequestError) ? 404 : 500
            res.status(status).json({ message, erro: (error as Error).message }) 
        }
    }
}