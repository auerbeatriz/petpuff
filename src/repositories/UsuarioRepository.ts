import { Repository } from "typeorm";
import { DataBaseConnection } from "../config/typeorm";
import { Login } from "../entities/Login";
import { UsuariosParams } from "../types/Users";

export class UserRepository {
    static repository = DataBaseConnection.getRepository(Login)

    static async findByLogin(login:string) {
        return await this.repository.findOne({where:{ login }});
    }

    static async create(userData:{login: string, token:string}) {
        return await this.repository.create(userData);
    }
}