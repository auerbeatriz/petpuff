import { DataBaseConnection } from "../config/typeorm";
import { Pelucia } from "../entities/Pelucia";
import { AtualizarPelucia } from "../types/AtualizarOrcamentoPayload";
import { CheckoutPelucia } from "../types/Checkout.interface";
import { PeluciaInterface } from "../types/CriarOrcamentoPayload";
import { BadRequestError } from "../types/erros/BadRequestError";

export class PeluciaRepository {
    static repository = DataBaseConnection.getRepository(Pelucia)

    static async create(input: PeluciaInterface) {
        const pelucia = this.repository.create({
            nome: input.nome,
            detalhes: input.detalhes ?? '',
            tamanho: input.tamanho,
            kitMaterial: input.kitMaterial
        })

        await this.repository.save(pelucia)
        
        pelucia.id = await this.repository.getId(pelucia)
        return pelucia
    }

    static async update(input: AtualizarPelucia) {
        const { id, detalhes, tamanho, kitMaterial, peso } = input
        let pelucia

        if(!peso) {
            pelucia = await this.repository.update(id, { detalhes, tamanho, kitMaterial })
        } else {
            pelucia = await this.repository.update(id, { detalhes, tamanho, kitMaterial, peso })
        }

        return pelucia
    }

    static async atualizarMensagem(pelucia: CheckoutPelucia) {
        const { id, nomePresenteado, mensagemPresente } = pelucia

        if(!id) {
            throw new BadRequestError('Nenhuma pelúcia encontrada.')
        }

        await this.repository.update(id, {
            nomePresenteado,
            mensagemPresente
        })
    }

    static async delete(id: number) {
        return await this.repository.delete(id)
    }
}