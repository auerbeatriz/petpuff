import { Repository } from 'typeorm';
import { DataBaseConnection } from '../config/typeorm';
import { Login } from '../entities/Login';

export class LoginRepository extends Repository<Login> {
    constructor() {
        super(Login, DataBaseConnection.manager);
    }

    // Cria e salva um novo Login
    static async createLogin(username: string, password: string): Promise<Login> {
        const repository = DataBaseConnection.getRepository(Login);
        const login = repository.create({ username, password });
        return repository.save(login);
    }

    // Encontra um login pelo nome de usuário
    static async findByUsername(username: string): Promise<Login | null> {
        const repository = DataBaseConnection.getRepository(Login);
        return repository.findOneBy({ username });
    }

    // Encontra todos os logins relacionados a clientes
    static async findAllClients(): Promise<Login[]> {
        const repository = DataBaseConnection.getRepository(Login);
        return repository.createQueryBuilder('login')
            .leftJoinAndSelect('login.cliente', 'cliente')
            .where('cliente.id IS NOT NULL')
            .getMany();
    }

    // Encontra todos os logins relacionados a funcionários
    static async findAllFuncionarios(): Promise<Login[]> {
        const repository = DataBaseConnection.getRepository(Login);
        return repository.createQueryBuilder('login')
            .leftJoinAndSelect('login.funcionario', 'funcionario')
            .where('funcionario.id IS NOT NULL')
            .getMany();
    }
}
