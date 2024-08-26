import { KitMaterial } from "../entities/KitMaterial"
import { Tamanho } from "../entities/Tamanho"
import { StatusOrcamento } from "./enums"

export interface ResponderOrcamentoPayload {
    id: number
    valor: number
    prazoConfeccao: number
    informacoesAdicionais?: string
    updateDates?: boolean
}

export interface AtualizarOrcamento {
    valor: number
    prazoConfeccao: number
    informacoesAdicionais?: string
    dataRetorno?: Date
    dataExpiracao?: Date
    status?: StatusOrcamento
}

export interface AtualizarPeluciaPayload {
    tamanho: {
        id?: number
        altura?: number
    },
    kitMaterial: number
    detalhes: string
}

export interface AtualizarPelucia {
    id: number
    tamanho: Tamanho
    kitMaterial: KitMaterial
    detalhes: string
}