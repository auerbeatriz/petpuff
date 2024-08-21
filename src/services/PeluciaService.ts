import { Pelucia } from "../entities/Pelucia";
import { FotoPeluciaRepository } from "../repositories/FotoPeluciaRepository";
import { KitMaterialRepository } from "../repositories/KitMaterialRepository";
import { PeluciaRepository } from "../repositories/PeluciaRepository";
import { TamanhoRepository } from "../repositories/TamanhoRepository";
import { CriarOrcamentoPayload } from "../types/CriarOrcamentoPayload";

export class PeluciaService {
    
    async criarPelucia(input: CriarOrcamentoPayload): Promise<Pelucia> {
        const tamanho = await TamanhoRepository.create(input.tamanho) 
        const kitMaterial = input.kitMaterialId  ? (await KitMaterialRepository.get(input.kitMaterialId))[0] : undefined

        const pelucia = await PeluciaRepository.create({
            nome: input.nome, 
            detalhes: input.detalhes,
            tamanho, 
            kitMaterial
        })

        await FotoPeluciaRepository.create(input.fotos, pelucia.id)

        return pelucia
    }
}