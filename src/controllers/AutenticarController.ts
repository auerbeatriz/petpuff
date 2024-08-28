import { Request, Response } from "express";
import { UserRepository } from '../repositories/UsuarioRepository';
import { Login } from "../entities/Login";
import crypto from 'crypto';

export class AutenticarController {

    // Função auxiliar para gerar o token usando PBKDF2
    generateToken(password:string) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash= crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return Buffer.from(`${salt}:${hash}`).toString('base64');
    }

    // Função auxiliar para verificar o token
    verifyToken(password:string, token:string) {
        const [salt, originalHash] = Buffer.from(token, 'base64').toString().split(':');
        const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === originalHash;
    }

    async login(req: Request, res: Response) {
        const { login, password } = req.body;

        const user = await UserRepository.findByLogin(login);
        if (!user) {
            return res.status(401).json({ message: 'Login ou senha incorretos.' });
        }

        // Verifica se o token gerado a partir da senha corresponde ao armazenado
        if (!this.verifyToken(password, user.token)) {
            return res.status(401).json({ message: 'Login ou senha incorretos.' });
        }

        // Retorna o token como confirmação de login
        res.json({ token: user.token });
    }

    async register(req: Request, res: Response) {
        const { login, password } = req.body;

        const existingUser = await UserRepository.findByLogin(login);
        if (existingUser) {
            return res.status(400).json({ message: 'Login já registrado.' });
        }

        // Gera o token usando PBKDF2
        const token = this.generateToken(password);

        // Armazena o token no banco de dados
        await UserRepository.create({ login, token });
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    }
}