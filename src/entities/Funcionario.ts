import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Cargo } from "./Cargo";
import { Login } from "./Login";
import { Setor } from "../types/enums";

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    nome: string

    @Column({ type: "varchar", length: 25 })
    setor: Setor

    @OneToOne(() => Login)
    @JoinColumn({ name: "id_login" })
    login: Login

    @ManyToOne(() => Cargo)
    @JoinColumn({ name: "id_cargo" })
    cargo: Cargo
}
