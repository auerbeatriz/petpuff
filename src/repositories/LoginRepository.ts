import { Repository } from "typeorm";
import { DataBaseConnection } from "../config/typeorm";
import { Login } from "../entities/Login";
import { Cliente } from "../types/Users";

export class UserRepository {
    static repository = DataBaseConnection.getRepository(Login)

    static async findByLogin(login:string) {
        return await this.repository.findOne({where:{ login }});
    }

    static async create(input: Cliente){
        let [ cliente ] = await this.repository.get({ login: input.login, senha: input.senha, nome: input.nome, sobrenome: input.sobrenome, cpf: input.cpf, celular: input.celular})
        
            if(!cliente){
                cliente = this.repository.create({
                login: input.login, 
                senha: input.senha, 
                nome: input.nome,  
                sobrenome: input.sobrenome, 
                cpf: input.cpf, 
                celular: input.celular, 
                })
                await this.repository.save(cliente)
        }
    }
}