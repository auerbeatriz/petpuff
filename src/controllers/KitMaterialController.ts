import { Request, Response } from "express";
import { KitMaterialRepository } from "../repositories/kitMaterialRepository";

export class KitMaterialController {
    async getKitsMateriais(req: Request, res: Response) {
        try {
            const kits = await KitMaterialRepository.getKits()
            return res.status(200).json(kits)
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar kits de materiais. Erro: ", error });
        }
    } 
}