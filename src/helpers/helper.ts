import { MetodoEntrega } from "../types/Checkout.interface"
import { BadRequestError } from "../types/erros/BadRequestError"

export class CommonHelper {
    static validarInput(schema: string[], requestBody: any) {
        schema.forEach(param => {
            if(!(param in requestBody)) {
                throw new BadRequestError(`Erro na validação do payload. Parâmetro '${ param }' está faltando.`)
            }
        })
    }

    static getEntregaLocal(): MetodoEntrega[] {
        return [
            {
                nome: 'Entrega local',
                valor: 15,
                prazo: 2
            }, 
            {
                nome: 'Retirada em loja',
                valor: 0,
                prazo: 1
            }
        ]
    }
}