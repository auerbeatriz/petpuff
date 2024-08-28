import { Request, Response } from "express";
import { MetodoEntregaService } from "../services/MetodoEntregaService";
import { CommonHelper } from "../helpers/helper";
import { Schema } from "../types/schemas";
import { FecharPedidoService } from "../services/FecharPedidoService";

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
            res.status(500).json({ message, erro: (error as Error).message }) 
        }
    }

    async fecharPedido(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.FECHAR_PEDIDO, req.body)
            const input = req.body

            const service = new FecharPedidoService()
            const idPedido = await service.execute(input)

            res.status(200).json({ id: idPedido })
        } catch(error) {
            const message = 'Não foi possível criar o pedido.'
            res.status(500).json({ message, erro: (error as Error).message }) 
        }
    }
}