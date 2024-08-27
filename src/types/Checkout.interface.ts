export interface GetMetodoEntregaPayload {
    altura: number
    peso: number
    valor: number
    cep: string
}

export interface DimensaoPacoteEnvio {
    altura: number
    largura: number
    comprimento: number
}

export interface Frete {
    id: number
    name: string
    price: number
    delivery_time: number
    company: {
        id: number
        name: string
        picture: string
    }
}

export interface MetodoEntrega {
    id?: number
    nome: string
    valor: number
    prazo: number
    empresa?: {
        id: number
        nome: string
        icone: string
    }
}