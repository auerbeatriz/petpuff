import { DataBaseConnection } from "../config/typeorm";
import { KitMaterial } from "../entities/KitMaterial";

export class KitMaterialRepository {
    static repository = DataBaseConnection.getRepository(KitMaterial)

    static async getKits() {
        return await this.repository.createQueryBuilder("kit_material")
            .leftJoinAndSelect("kit_material.materiais", "material")
            .leftJoinAndSelect("kit_material.precoTamanhoPadrao", "precoKitTamanhoPadrao")
            .leftJoinAndSelect("precoKitTamanhoPadrao.tamanho", "tamanho")
            .select([
                "kit_material.id", 
                "kit_material.nome", 
                "material.nome", 
                "material.descricao",
                "precoKitTamanhoPadrao.valor",
                "tamanho.nome",
                "tamanho.altura"
            ])
            .getMany()
    }
}