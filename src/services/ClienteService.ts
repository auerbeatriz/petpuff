import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {

    async get(login: string) {
        const cliente = await ClienteRepository.getByLogin(login)
        return cliente
    }
}