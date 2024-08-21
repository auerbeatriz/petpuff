import { DataBaseConnection } from "../config/typeorm";
import { Pelucia } from "../entities/Pelucia";
import { PeluciaInterface } from "../types/CriarOrcamentoPayload";

export class PeluciaRepository {
    static repository = DataBaseConnection.getRepository(Pelucia)

    static async create(input: PeluciaInterface) {
        const pelucia = this.repository.create({
            nome: input.nome,
            detalhes: input.detalhes ?? '',
            tamanho: input.tamanho,
            kitMaterial: input.kitMaterial
        })

        await this.repository.save(pelucia)
        
        pelucia.id = await this.repository.getId(pelucia)
        return pelucia
    }

    static async delete(id: number) {
        return await this.repository
        .createQueryBuilder()
        .delete()
        .from(Pelucia)
        .where(`id = ${id}`)
        .execute()
    }
}