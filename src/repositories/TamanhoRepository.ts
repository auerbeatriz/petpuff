import { DataBaseConnection } from "../config/typeorm"
import { Tamanho } from "../entities/Tamanho"
import { TamanhoInterface } from "../types/CriarOrcamentoPayload"
import { GetTamanhoParams } from "../types/Tamanho"

export class TamanhoRepository {
    static repository = DataBaseConnection.getRepository(Tamanho)

    static async get(params: GetTamanhoParams) {
        return await this.repository.find({
            where: {
                padrao: params.padrao,
                altura: params.altura,
                nome: params.nome,
                id: params.id
            }
        })
    }

    static async create(input: TamanhoInterface) {
        let [ tamanho ] = await this.get({ altura: input.altura, nome: input.nome, id: input.id })

        if(!tamanho) {
            tamanho = this.repository.create({
                altura: input.altura,
                padrao: input.padrao ?? false,
                nome: input.nome
            })
    
            await this.repository.save(tamanho)
        }
        
        return tamanho
    }
}