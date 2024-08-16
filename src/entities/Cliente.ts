import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Endereco } from './Endereco'
import { Login } from './Login'

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'varchar'})
    sobrenome:string

    @Column({type: 'char'})
    cpf: string

    @Column({type: 'varchar'})
    email: string

    @Column({type: 'char', nullable: true})
    celular: string

    @OneToOne(() => Login)
    @JoinColumn({name: 'id_login'})
    login: Login

    @OneToOne(() => Endereco)
    @JoinColumn({name: 'id_endereco'})
    id_endereco: Endereco
}