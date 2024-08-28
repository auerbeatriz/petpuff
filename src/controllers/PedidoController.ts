import { Request, Response } from "express";
import { PedidoService } from "../services/PedidoService";
import { CommonHelper } from "../helpers/helper";
import { Schema } from "../types/schemas";

export class PedidoController {
    private service = new PedidoService()

    async getMetodosEntrega(req: Request, res: Response) {
        try {
            CommonHelper.validarInput(Schema.GET_METODOS_ENTREGA, req.body)
            const input = req.body

            const metodosEntrega = await this.service.getMetodosEntrega(input)
            res.status(200).json(metodosEntrega)
        } catch(error) {
            const message = 'Não foi possível obter métodos de entrega.'
            res.status(500).json({ message, erro: (error as Error).message }) 
        }
    }
}