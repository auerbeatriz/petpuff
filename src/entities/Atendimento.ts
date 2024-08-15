import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Funcionario } from "./Funcionario";

@Entity()
export class Atendimento {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: "id_cliente" })
    cliente: Cliente

    @ManyToOne(() => Funcionario)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario

    @Column({ type: "varchar", length: 10 })
    numeroAtendimento: string
}
