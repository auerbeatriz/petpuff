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
                login: { username: login }
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


    static async findById(id: number): Promise<Cliente | null> {
        const clienteRepository = DataBaseConnection.getRepository(Cliente);
        const cliente = await clienteRepository.findOne({ where: { id } });
        return cliente || null;
    }

    static async createCliente(email: string, nome: string, sobrenome: string, cpf: string, celular: string, login: Cliente['login']): Promise<Cliente> {
        const repository = DataBaseConnection.getRepository(Cliente);
        const cliente = repository.create({ email, nome, sobrenome, cpf, celular, login });
        return repository.save(cliente);
    }

    static async findByEmail(email: string): Promise<Cliente | null> {
        const repository = DataBaseConnection.getRepository(Cliente);
        return repository.findOne({ where: { email }, relations: ['login'] });
    }

    static async findByCpf(cpf: string): Promise<Cliente | null> {
        const repository = DataBaseConnection.getRepository(Cliente);
        return repository.findOne({ where: { cpf }, relations: ['login'] });
    }
}
