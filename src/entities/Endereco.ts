import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Bairro } from './Bairro';

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    rua: string

    @Column({ type: 'integer' })
    numero: number

    @Column({ type: 'varchar', length: 50, nullable: true })
    complemento: string

    @Column({ type: 'char', length: 8 })
    cep: string

    @ManyToOne(() => Bairro)
    @JoinColumn({ name: 'id_bairro' })
    bairro: Bairro
}
