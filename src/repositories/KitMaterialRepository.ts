import { Request, Response } from "express";
import { DataBaseConnection } from "../config/typeorm";
import { KitMaterial } from "../entities/KitMaterial";

export class KitMaterialRepository {
    static repository = DataBaseConnection.getRepository(KitMaterial)

    static async getKits() {
        return await this.repository.createQueryBuilder("kit_material")
            .leftJoinAndSelect("kit_material.materiais", "material")
            .select([
                "kit_material.id", 
                "kit_material.nome", 
                "material.nome", 
                "material.descricao"
            ])
            .getMany()
    }
}