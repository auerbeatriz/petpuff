import { KitMaterial } from "../entities/KitMaterial"
import { Tamanho } from "../entities/Tamanho"

export interface TamanhoInterface {
    id?: number
    altura?: number
    padrao?: boolean
    nome?: string
}

export interface PeluciaInterface {
    nome: string
    tamanho: Tamanho
    kitMaterial?: KitMaterial
    detalhes?: string
}

export interface CriarOrcamentoPayload {
    nome: string
    fotos: string[]
    tamanho: TamanhoInterface
    kitMaterialId?: number
    detalhes?: string,
    clienteId: number
}