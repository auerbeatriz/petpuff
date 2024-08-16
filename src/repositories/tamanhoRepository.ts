import { DataBaseConnection } from "../config/typeorm"
import { Tamanho } from "../entities/Tamanho"

export const tamanhoRepository = DataBaseConnection.getRepository(Tamanho)