import { DataBaseConnection } from "../config/typeorm";
import { Atendimento } from "../entities/Atendimento";

export class AtendimentoRepository {
    static repository = DataBaseConnection.getRepository(Atendimento)

    static async get(clienteId: number) {
        return (await this.repository.find({ where: { cliente: { id: clienteId }, estaAberto: true}}))[0]
    }

    static async create(clienteId: number) {
        const atendimento = this.repository.create({
            cliente: {
                id: clienteId
            },
            estaAberto: true
        })

        await this.repository.save(atendimento)

        return atendimento
    }

    static async atualizar(id: number, idFuncionario: number) {
        await this.repository.update(id, { funcionario: { id: idFuncionario }})
    }
}