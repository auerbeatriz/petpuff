export interface PedidoResponse {
    id: number
    status: string
    dataPedido: string
    dataEntrega: string
    valor: number
    pelucia: {
        foto: string
        nome: string
    }
}

