import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Setor } from '../types/enums';
import { Login } from './Login';
import { Cargo } from './Cargo';

@Entity('funcionario')
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30 })
    nome: string

    @Column({ type: 'varchar', length: 25 })
    setor: Setor

    @OneToOne(() => Login)
    @JoinColumn({ name: 'id_login' })
    login: Login

    @ManyToOne(() => Cargo)
    @JoinColumn({ name: 'id_cargo' })
    cargo: Cargo
}
