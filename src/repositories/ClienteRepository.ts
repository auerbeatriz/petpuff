import { DataBaseConnection } from "../config/typeorm";
import { Cliente } from "../entities/Cliente";

export class ClienteRepository {
    static repository = DataBaseConnection.getRepository(Cliente)

    static async get(clienteId: number) {
        return (await this.repository.find({ where: { id: clienteId }}))[0]
    }
}