import { DataBaseConnection } from "../config/typeorm";
import { Cliente } from "../entities/Cliente";
import { NotFoundError } from "../types/erros/NotFoundError";


export class ClienteRepository {
    static repository = DataBaseConnection.getRepository(Cliente)

    static async getId(clienteId: number) {
        return (await this.repository.find({ where: { id: clienteId }}))[0]
    }

    static async createClient(clientData: {
        email: string;
        senha: string;
        nome: string;
        sobrenome: string;
        cpf: string;
        celular: string;
    }) {
        const client = this.repository.create(clientData);
        return this.repository.save(client);
    }
    static async findByEmail(email: string) {
        return this.repository.findOneBy({ email });
    }

    static async getByLogin(login: string): Promise<Cliente> {
        const cliente = await this.repository.findOne({
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                cpf: true,
                email: true,
                celular: true
            },
            relations: {
                endereco: true
            },
            where: {
                login: { login }
            }
        })

        if(!cliente) {
            throw new NotFoundError(`Nenhum cliente com login: {${ login }}`)
        }

        return cliente
    }
}