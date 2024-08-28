import { CommonHelper } from "../helpers/helper";
import { DimensaoPacoteEnvio, Frete, GetMetodoEntregaPayload, MetodoEntrega } from "../types/Checkout.interface";
import { BadRequestError } from "../types/erros/BadRequestError";

export class MetodoEntregaService {
    async getMetodosEntrega(input: GetMetodoEntregaPayload) {
        const url = 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'
        const cep = Number(input.cep)

        const metodosEntrega = await this.fetchMelhorEnvio(url, input)

        if(cep >= 64260000 && cep <= 64264999) {
            return metodosEntrega.concat(CommonHelper.getEntregaLocal())
        }

        return metodosEntrega
    }

    private async fetchMelhorEnvio(url: string, input: GetMetodoEntregaPayload): Promise<MetodoEntrega[]> {
        const { altura, peso, valor, cep } = input
        const dimensoesPacote = this.getDimensoesEnvio(altura)

        const result = await fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ process.env.TOKEN_MELHOR_ENVIO }`,
              'User-Agent': `Aplicação ${ process.env.EMAIL }`
            },
            body: JSON.stringify({
                from: { postal_code: process.env.CEP },
                to: { postal_code: cep },
                products: [{
                    width: dimensoesPacote.largura,
                    height: dimensoesPacote.altura,
                    length: dimensoesPacote.comprimento,
                    weight: peso / 1000,
                    insurance_value: valor,
                    quantity: 1
                }]
            })
        }).then(response => response.json())

        const response: MetodoEntrega[] = (result as Frete[]).map(metodo => {
            return {
                id: metodo.id,
                nome: metodo.name,
                valor: metodo.price,
                prazo: metodo.delivery_time,
                empresa: {
                    id: metodo.company.id,
                    nome: metodo.company.name,
                    icone: metodo.company.picture
                }
            }
        })

        return response
    }

    private getDimensoesEnvio(altura: number): DimensaoPacoteEnvio {
        if (altura >= 10 && altura <= 16) {
            return { altura: 20, largura: 20, comprimento: 20 }
        } else if (altura >= 17 && altura <= 24) {
            return { altura: 30, largura: 30, comprimento: 30 }
        } else if (altura >= 25 && altura <= 40) {
            return { altura: 50, largura: 50, comprimento: 50 }
        } else if (altura >= 41 && altura <= 64) {
            return { altura: 80, largura: 65, comprimento: 65 }
        } else if (altura >= 65 && altura <= 120) {
            return { altura: 130, largura: 120, comprimento: 120 }
        } else if (altura >= 121 && altura <= 200) {
            return { altura: 150, largura: 140, comprimento: 140 }
        } else {
            throw new BadRequestError('Altura fora do intervalo permitido < 10 - 200 > cm.')
        }
    }
}