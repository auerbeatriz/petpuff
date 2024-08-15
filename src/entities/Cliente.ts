import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity
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

    @Column({type: 'char'})
    celular: string

    @OneToOne(() => Login)
    @JoinColumn({name: 'id_login'})
    login: Login

    @OneToOne(() => Endereco)
    @JoinColumn({name: 'id_endereco'})
    id_endereco: Endereco
}