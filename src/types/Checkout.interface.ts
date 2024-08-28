import { Pedido } from "../entities/Pedido"
import { Endereco as EnderecoEntity } from "../entities/Endereco"
import { Endereco } from "./Endereco.interface"
import { MetodoPagamento } from "./enums"

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

export interface FecharPedidoPayload {
    valorPelucia: number
    entrega: {
        frete: MetodoEntrega
        endereco: Endereco
    }
    pagamento: Pagamento
    prazoConfeccao: number
}

export interface Pagamento {
    metodoPagamento: MetodoPagamento
    valor: number
    cartao?: {
        numero: number
        mesValidade: number
        anoValidade: number
        cvv: number
        titular: string
    }
}

export interface CriarEntregaInterface {
    frete: MetodoEntrega
    enderecoEntrega: EnderecoEntity
    prazoConfeccao: number
    pedido: Pedido
}