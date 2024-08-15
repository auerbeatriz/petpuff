import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Pedido } from './Pedido';
import { AndamentoEntrega } from './EtapaEntrega';
import { MetodoEntrega } from '../types/enums';
import { Endereco } from './Endereco';

@Entity()
export class Entrega {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 16 })
    metodoEntrega: MetodoEntrega

    @Column({ type: 'date' })
    dataPrevisaoEntrega: Date

    @Column({ type: 'varchar', length: 25 })
    codigoRastreio: string

    @Column({ type: 'double precision' })
    valorFrete: number

    @OneToOne(() => Pedido, pedido => pedido.entrega)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido

    @OneToOne(() => Endereco)
    @JoinColumn({ name: 'id_endereco' })
    endereco: Endereco

    @OneToMany(() => AndamentoEntrega, andamentoEntrega => andamentoEntrega.entrega)
    andamentoEntrega: AndamentoEntrega[];
}
