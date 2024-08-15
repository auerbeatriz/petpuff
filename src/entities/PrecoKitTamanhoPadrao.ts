import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { KitMaterial } from "./KitMaterial";
import { Tamanho } from "./Tamanho";

@Entity()
export class PrecoKitTamanhoPadrao {
    @ManyToOne(() => KitMaterial, kitMaterial => kitMaterial.precoTamanhoPadrao)
    @JoinColumn({ name: "id_kitmaterial" })
    kitMaterial: KitMaterial

    @ManyToOne(() => Tamanho, tamanho => tamanho.precoTamanhoPadrao)
    @JoinColumn({ name: "id_tamanho" })
    tamanho: Tamanho

    @Column({ type: "double precision" })
    valor: number
}
