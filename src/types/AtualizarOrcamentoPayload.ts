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