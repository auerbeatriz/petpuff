import { Request, Response } from "express"
import { TamanhoRepository } from "../repositories/TamanhoRepository";

export class TamanhoController {
    async getTamanhos(req: Request, res: Response) {
        try {
            const tamanhos = await TamanhoRepository.get({padrao: true})
            return res.status(200).json(tamanhos)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar tamanhos.", error });
        }
    }
}