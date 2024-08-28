import { DataBaseConnection } from "../config/typeorm";
import { AndamentoEntrega } from "../entities/AndamentoEntrega";
import { Endereco } from "../entities/Endereco";
import { Entrega } from "../entities/Entrega";
import { CommonHelper } from "../helpers/helper";
import { CriarEntregaInterface, Frete } from "../types/Checkout.interface";
import { EtapaEntrega, MetodoEntrega } from "../types/enums";

export class EntregaRepository {
    static repository = DataBaseConnection.getRepository(Entrega)

    static async get(id: number) {
        return await this.repository.findOneByOrFail({ id })
    }

    static async criar(input: CriarEntregaInterface): Promise<Entrega> {
        const { frete, prazoConfeccao, enderecoEntrega, pedido } = input
        const prazoEntrega = this.getPrazoEntrega(prazoConfeccao, frete.prazo)
        
        let metodoEnvio = frete.empresa?.nome
        if(metodoEnvio === 'Correios') {
            metodoEnvio = frete.nome
        }

        const response = this.repository.create({
            metodoEntrega: MetodoEntrega[metodoEnvio?.toUpperCase() as keyof typeof MetodoEntrega] ?? '',
            dataPrevisaoEntrega: prazoEntrega,
            valorFrete: frete.valor,
            endereco: enderecoEntrega,
            pedido
        })

        await this.repository.save(response)
        return response
    }

    private static getPrazoEntrega(prazoConfeccao: number, prazoEntrega: number): Date {
        const hoje = new Date()
        const previsaoConfeccao = CommonHelper.addBusinessDays(hoje, prazoConfeccao)
        const previsaoEntrega = CommonHelper.addDays(previsaoConfeccao, prazoEntrega)

        return previsaoEntrega
    }

    static async atualizarAndamento(entrega: Entrega, status: string) {
        const andamentoEntregaRepository = DataBaseConnection.getRepository(AndamentoEntrega)

        const response = andamentoEntregaRepository.create({
            dataHoraMudanca: new Date(),
            etapaAtual: EtapaEntrega[status as keyof typeof EtapaEntrega],
            entrega
        })

        await andamentoEntregaRepository.save(response)
    }
}