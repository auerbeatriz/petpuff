import { Repository } from 'typeorm';
import { DataBaseConnection } from '../config/typeorm';
import { Funcionario } from '../entities/Funcionario';
import { Setor } from '../types/enums';

export class FuncionarioRepository extends Repository<Funcionario> {
    constructor() {
        super(Funcionario, DataBaseConnection.manager);
    }

    // Cria e salva um novo Funcionário
    static async createFuncionario(setor: Setor, nome: string, login: Funcionario['login']): Promise<Funcionario> {
        const repository = DataBaseConnection.getRepository(Funcionario);
        const funcionario = repository.create({ nome, setor, login});
        return repository.save(funcionario);
    }

    // Encontra todos os funcionários
    static async findAll(): Promise<Funcionario[]> {
        const repository = DataBaseConnection.getRepository(Funcionario);
        return repository.find({ relations: ['login'] });
    }
}
