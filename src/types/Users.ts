export interface ClienteInterface{
    login: any
    id: number
    email: string
    senha: string
    nome: string
    sobrenome: string
    cpf: string
    celular: string
}

export interface LoginInterface{
    login: string
    senha: string
    token: string 
}