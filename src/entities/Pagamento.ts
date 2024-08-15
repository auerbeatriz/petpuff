import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Pedido } from './Pedido';
import { MetodoPagamento } from '../types/enums';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp' })
    data: Date

    @Column({ type: 'double precision' })
    valor: number

    @Column({ type: 'varchar', length: 17 })
    metodoPagamento: MetodoPagamento

    @OneToOne(() => Pedido, pedido => pedido.pagamento)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido
}
