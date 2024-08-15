import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { KitMaterial } from "./KitMaterial";

@Entity()
export class Material {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    nome: string

    @Column({ type: "text", nullable: true })
    descricao: string

    @ManyToMany(() => KitMaterial, kitMaterial => kitMaterial.materiais)
    kits: KitMaterial[];
}
