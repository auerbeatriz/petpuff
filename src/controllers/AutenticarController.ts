import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    
    static async register(req: Request, res: Response) {
        try {
            const {password, email, nome, sobrenome, cpf, celular } = req.body;
            const userDetails = { email, nome, sobrenome, cpf, celular };

            const login = await AuthService.register(password, userDetails);

            return res.status(201).json({ message: 'Usuário registrado com sucesso', login });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            } else {
                return res.status(500).json({ message: 'Erro desconhecido' });
            }
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const login = await AuthService.login(username, password);

            return res.status(200).json({ message: 'Autenticado com sucesso', login });
        } catch (error) {
            return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
        }
    }
}
