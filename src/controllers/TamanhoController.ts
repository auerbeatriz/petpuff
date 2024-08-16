import { Request, Response } from "express"
import { tamanhoRepository } from "../repositories/tamanhoRepository";

export class TamanhoController {
    async getTamanhos(req: Request, res: Response) {
        try {
            const tamanhos = await tamanhoRepository.find()
            return res.status(200).json(tamanhos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar tamanhos.", error });
        }
    }
}