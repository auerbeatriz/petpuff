import { BadRequestError } from "../types/erros/BadRequestError"

export class CommonHelper {
    static validarInput(schema: string[], requestBody: any) {
        schema.forEach(param => {
            if(!(param in requestBody)) {
                throw new BadRequestError(`Erro na validação do payload. Parâmetro '${ param }' está faltando.`)
            }
        })
    }
}