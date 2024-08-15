import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidade } from "./Cidade";

@Entity()
export class Estado {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 50 })
    nome: string

    @Column({ type: "char", length: 2 })
    sigla: string

    @OneToMany(() => Cidade, cidade => cidade.estado)
    cidades: Cidade[]
}