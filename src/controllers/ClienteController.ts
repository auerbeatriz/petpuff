import { Request, Response } from 'express';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Login } from '../entities/Login';

export class ClienteController {

    static async create(req: Request, res: Response) {
        try {
            const { email, nome, sobrenome, cpf, celular } = req.body;
            const login = email
            
            const cliente = await ClienteRepository.createCliente(email, nome, sobrenome, cpf, celular, login);

            return res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
        } catch (error) {
            return res.status(400).json({ message: "Erro" });
        }
    }

    static async getCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await ClienteRepository.findById(parseInt(id));

            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }

            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(400).json({ message: "Erro" });
        }
    }
}
