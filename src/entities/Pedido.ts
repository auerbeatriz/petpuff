import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Entrega } from "./Entrega";
import { Pagamento } from "./Pagamento";
import { Devolucao } from "./Devolucao";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "timestamp" })
    dataRealizacao: Date

    @Column({ type: "double precision" })
    valorTotal: number

    @OneToOne(() => Entrega, entrega => entrega.pedido)
    entrega: Entrega

    @OneToOne(() => Pagamento, pagamento => pagamento.pedido)
    pagamento: Pagamento

    @OneToOne(() => Devolucao, devolucao => devolucao.pedido)
    devolucao: Devolucao
}
