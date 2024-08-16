import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cargo')
export class Cargo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    nome: string
}
