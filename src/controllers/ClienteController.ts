import { Request, Response } from "express"
import { UnauthorizedError } from "../types/erros/UnauthorizedError"
import { BadRequestError } from "../types/erros/BadRequestError"
import { ClienteService } from "../services/ClienteService"
import { NotFoundError } from "../types/erros/NotFoundError"

export class ClienteController {
    private service = new ClienteService()

    async getCliente(req: Request, res: Response) {
    
        
    }
}