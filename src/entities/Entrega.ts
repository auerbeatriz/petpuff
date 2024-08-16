import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Pedido } from './Pedido';
import { AndamentoEntrega } from './AndamentoEntrega';
import { MetodoEntrega } from '../types/enums';
import { Endereco } from './Endereco';

@Entity('entrega')
export class Entrega {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 16, name: 'metodo_entrega' })
    metodoEntrega: MetodoEntrega

    @Column({ type: 'date', nullable: true, name: 'data_previsao_entrega' })
    dataPrevisaoEntrega: Date

    @Column({ type: 'varchar', length: 25, nullable: true, name: 'codigo_rastreio' })
    codigoRastreio: string

    @Column({ type: 'double precision', nullable: true, name: 'valor_frete' })
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
