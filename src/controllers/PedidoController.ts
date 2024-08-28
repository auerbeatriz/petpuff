import { Request, Response } from "express";
import { MetodoEntregaService } from "../services/MetodoEntregaService";
import { CommonHelper } from "../helpers/helper";
import { Schema } from "../types/schemas";
import { FecharPedidoService } from "../services/FecharPedidoService";
import { AndamentoPedidoService } from "../services/AndamentoPedidoService";
import { BadRequestError } from "../types/erros/BadRequestError";
import { AndamentoEntregaService } from "../services/AndamentoEntregaService";

export class PedidoController {
    async getMetodosEntrega(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.GET_METODOS_ENTREGA, req.body)
            const input = req.body

            const service = new MetodoEntregaService()
            const metodosEntrega = await service.getMetodosEntrega(input)

            res.status(200).json(metodosEntrega)
        } catch(error) {
            const message = 'Não foi possível obter métodos de entrega.'
            const statusCode = (error instanceof BadRequestError) ? 404 : 500 
            res.status(statusCode).json({ message, erro: (error as Error).message }) 
        }
    }

    async fecharPedido(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.FECHAR_PEDIDO, req.body)
            const input = req.body

            if(!input.cliente.id) {
                throw new BadRequestError('Nenhum cliente associado.')
            }

            if(!input.orcamento) {
                throw new BadRequestError('Nenhum orçamento associado.')
            }

            const service = new FecharPedidoService()
            const idPedido = await service.execute(input)

            res.status(200).json({ id: idPedido })
        } catch(error) {
            const message = 'Não foi possível criar o pedido.'
            const statusCode = (error instanceof BadRequestError) ? 404 : 500 
            res.status(statusCode).json({ message, erro: (error as Error).message }) 
        }
    }

    async atualizarProducao(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.ANDAMENTO_PEDIDO, req.body)
            const input = req.body

            const service = new AndamentoPedidoService()
            await service.atualizarPedido(input.status, input.id)

            res.status(201).json()
        } catch(error) {
            const message = 'Não foi possível atualizar o andamento da produção do pedido.'
            const statusCode = (error instanceof BadRequestError) ? 404 : 500 
            res.status(statusCode).json({ message, erro: (error as Error).message }) 
        }
    }

    async atualizarEntrega(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.ANDAMENTO_PEDIDO, req.body)
            const input = req.body

            const service = new AndamentoEntregaService()
            await service.atualizarPedido(input.status, input.id)

            res.status(201).json()
        } catch(error) {
            const message = 'Não foi possível atualizar o andamento da entrega do pedido.'
            const statusCode = (error instanceof BadRequestError) ? 404 : 500 
            res.status(statusCode).json({ message, erro: (error as Error).message }) 
        }
    }
}