import * as crypto from 'crypto';
import { LoginRepository } from '../repositories/LoginRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { FuncionarioRepository } from '../repositories/FuncionarioRepository';
import { Login } from '../entities/Login';

export class AuthService {
    // Constantes para PBKDF2
    private static readonly TOKEN_FIXO = 'fixed_token_value'; // Token fixo para todas as operações de codificação/decodificação
    private static readonly ITERATIONS = 10000;
    private static readonly KEY_LENGTH = 64;
    private static readonly DIGEST = 'sha512';

    // Função para codificar a senha usando PBKDF2 com um token fixo
    static async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, this.TOKEN_FIXO, this.ITERATIONS, this.KEY_LENGTH, this.DIGEST, (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey.toString('base64'));
            });
        });
    }

    // Função para verificar se a senha fornecida corresponde ao hash armazenado
    static async verifyPassword(storedPassword: string, providedPassword: string): Promise<boolean> {
        const hashedProvidedPassword = await this.hashPassword(providedPassword);
        return storedPassword === hashedProvidedPassword;
    }

    // Função para registrar um novo usuário (cliente ou funcionário)
    static async register(
        
        password: string,
        userDetails: { email: string, nome: string, sobrenome: string, cpf: string, celular: string }): Promise<Login> {
        const existingLogin = await LoginRepository.findByUsername(userDetails.email);
        if (existingLogin) {
            throw new Error('Nome de usuário já existe');
        }

        const hashedPassword = await this.hashPassword(password);
        const login = await LoginRepository.createLogin(userDetails.email, hashedPassword);
        
        await ClienteRepository.createCliente(
                userDetails.email,
                userDetails.nome,
                userDetails.sobrenome,
                userDetails.cpf,
                userDetails.celular,
                login
            );

        return login;
    }

    // Função para autenticar um usuário
    static async login(username: string, password: string): Promise<Login> {
        const login = await LoginRepository.findByUsername(username);
        if (!login) {
            throw new Error('Nome de usuário ou senha incorretos');
        }

        const isPasswordValid = await this.verifyPassword(login.password, password);
        if (!isPasswordValid) {
            throw new Error('Nome de usuário ou senha incorretos');
        }

        return login;
    }
}
