import { EntregaRepository } from "../repositories/EntregaRepository"

export class AndamentoEntregaService {
    async atualizarPedido(status: string, id: number) {
        const entrega = await EntregaRepository.get(id)
        await EntregaRepository.atualizarAndamento(entrega, status)
    }
}