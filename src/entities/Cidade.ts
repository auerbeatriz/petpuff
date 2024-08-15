import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Estado } from "./Estado";

@Entity()
export class Cidade {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    nome: string

    @ManyToOne(() => Estado, estado => estado.cidades)
    @JoinColumn({ name: "id_estado" })
    estado: Estado
}
