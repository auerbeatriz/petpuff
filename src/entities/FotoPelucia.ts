import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Pelucia } from "./Pelucia";

@Entity()
export class FotoPelucia {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text" })
    url: string

    @ManyToOne(() => Pelucia)
    @JoinColumn({ name: "id_pelucia" })
    pelucia: Pelucia
}
