import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('endereco')
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
}
