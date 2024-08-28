import { DataBaseConnection } from "../config/typeorm";
import { Cliente } from "../entities/Cliente";
import { CheckoutCliente } from "../types/Checkout.interface";
import { BadRequestError } from "../types/erros/BadRequestError";
import { NotFoundError } from "../types/erros/NotFoundError";
import { EnderecoRepository } from "./EnderecoRepository";

export class ClienteRepository {
    static repository = DataBaseConnection.getRepository(Cliente)

    static async get(clienteId: number) {
        return (await this.repository.find({ where: { id: clienteId }}))[0]
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

    static async atualizarEndereco(cliente: CheckoutCliente) {
        const { id, enderecoFiscal, cpf } = cliente
        const clienteBD = await this.get(id)

        if(clienteBD.cpf === cpf) {
            if(!enderecoFiscal) {
                throw new BadRequestError('Nenhum endereço fiscal encontrado.')
            }

            const endereco = await EnderecoRepository.criar(enderecoFiscal)
            await this.repository.update(id, {
                endereco
            })
        }
    }
}