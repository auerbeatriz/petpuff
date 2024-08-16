import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Pedido } from './Pedido';
import { MetodoPagamento } from '../types/enums';

@Entity('pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp' })
    data: Date

    @Column({ type: 'double precision' })
    valor: number

    @Column({ type: 'varchar', length: 17, nullable: true, name: 'metodo_pagamento' })
    metodoPagamento: MetodoPagamento

    @OneToOne(() => Pedido, pedido => pedido.pagamento)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido
}
