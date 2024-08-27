import { Request, Response } from "express"
import auth, { BasicAuthResult } from "basic-auth"
import { UnauthorizedError } from "../types/erros/UnauthorizedError"
import { BadRequestError } from "../types/erros/BadRequestError"
import { ClienteService } from "../services/ClienteService"
import { NotFoundError } from "../types/erros/NotFoundError"

export class ClienteController {
    private service = new ClienteService()

    async getCliente(req: Request, res: Response) {
        try {
            const { name } = auth(req) as BasicAuthResult
            if(!name) {
                throw new UnauthorizedError('login não enviado.')
            }

            const cliente = await this.service.get(name)
            res.status(200).json(cliente)
        } catch(error) {
            const message = 'Não foi possível obter os dados do cliente.'
            
            let status = 500
            if(error instanceof BadRequestError || error instanceof NotFoundError) status = 404
            if(error instanceof UnauthorizedError) status = 401

            res.status(status).json({ message, erro: (error as Error).message }) 
        }

        
    }
}