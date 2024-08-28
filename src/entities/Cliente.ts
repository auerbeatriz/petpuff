import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Endereco } from './Endereco'
import { Login } from './Login'
import { Pedido } from './Pedido'

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'varchar', nullable: true})
    nome: string

    @Column({type: 'varchar', nullable: true})
    sobrenome:string

    @Column({type: 'char', length: '11', nullable: true})
    cpf: string

    @Column({type: 'varchar', nullable: true})
    email: string

    @Column({type: 'char', length: '11', nullable: true})
    celular: string

    @OneToOne(() => Login)
    @JoinColumn({name: 'id_login'})
    login: Login

    @OneToOne(() => Endereco)
    @JoinColumn({name: 'id_endereco'})
    endereco: Endereco

    @OneToMany(() => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[]
}