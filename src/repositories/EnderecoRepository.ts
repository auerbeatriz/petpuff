import { DataBaseConnection } from "../config/typeorm"
import { Endereco } from "../entities/Endereco"
import { Endereco as EnderecoInterface } from "../types/Endereco.interface"


export class EnderecoRepository {
    static repository = DataBaseConnection.getRepository(Endereco)
    
    static async criar(endereco: EnderecoInterface): Promise<Endereco> {
        const response = this.repository.create({
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            cep: endereco.cep.toString()
        })

        await this.repository.save(response)
        return response
    }
}