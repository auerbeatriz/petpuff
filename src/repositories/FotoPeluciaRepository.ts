import { DataBaseConnection } from "../config/typeorm";
import { FotoPelucia } from "../entities/FotoPelucia";

export class FotoPeluciaRepository {
    static repository = DataBaseConnection.getRepository(FotoPelucia)

    static async create(fotos: string[], peluciaId: number) {
        const valores = fotos.map(foto => {
            return { url: foto, pelucia: { id: peluciaId } }
        })

        await this.repository.insert(valores)
    }

    static async deleteAll(ids: number[]) {
        return await this.repository.delete(ids)
    }
}