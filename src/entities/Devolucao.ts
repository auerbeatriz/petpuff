import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Pedido } from "./Pedido";

@Entity()
export class Devolucao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "timestamp" })
    dataSolicitacao: Date

    @Column({ type: "timestamp", nullable: true })
    dataPostagem: Date

    @Column({ type: "varchar", length: 25 })
    codigoCorreios: string

    @OneToOne(() => Pedido, pedido => pedido.devolucao)
    @JoinColumn({ name: "id_pedido" })
    pedido: Pedido
}
