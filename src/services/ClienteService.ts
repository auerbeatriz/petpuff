import { ClienteRepository } from "../repositories/ClienteRepository";

export class ClienteService {

    async get(login: string) {
        const cliente = await ClienteRepository.findByEmail(login)
        return cliente
    }
}