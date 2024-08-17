import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Pelucia } from './Pelucia';

@Entity('foto_pelucia')
export class FotoPelucia {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    url: string

    @ManyToOne(() => Pelucia, pelucia => pelucia.fotos)
    @JoinColumn({ name: 'id_pelucia' })
    pelucia: Pelucia
}
