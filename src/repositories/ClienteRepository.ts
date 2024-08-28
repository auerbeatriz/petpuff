import { Repository } from 'typeorm';
import { DataBaseConnection } from '../config/typeorm';
import { Cliente } from '../entities/Cliente';
import { Login } from '../entities/Login';

export class ClienteRepository extends Repository<Cliente> {
    static getCliente(clienteId: number) {
        throw new Error("Method not implemented.");
    }
    
    static async findById(id: number): Promise<Cliente | null> {
        const clienteRepository = DataBaseConnection.getRepository(Cliente);
        const cliente = await clienteRepository.findOne({ where: { id } });
        return cliente || null;
    }
    constructor() {
        super(Cliente, DataBaseConnection.manager);
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
