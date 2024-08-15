import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cidade } from './Cidade';

@Entity()
export class Bairro {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 150 })
    nome: string

    @ManyToOne(() => Cidade)
    @JoinColumn({ name: 'id_cidade' })
    cidade: Cidade
}
