import { DataBaseConnection } from "../config/typeorm";
import { Cliente } from "../entities/Cliente";

export const clienteRepository = DataBaseConnection.getRepository(Cliente)