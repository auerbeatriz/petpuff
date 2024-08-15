import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Entrega } from "./Entrega";
import { EtapaEntrega } from "../types/enums";

@Entity()
export class AndamentoEntrega {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 30 })
    etapaAtual: EtapaEntrega

    @Column({ type: "timestamp" })
    dataHoraMudanca: Date

    @ManyToOne(() => Entrega, entrega => entrega.andamentoEntrega)
    @JoinColumn({ name: "id_entrega" })
    entrega: Entrega
}
