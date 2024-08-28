import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EtapaPedido } from '../types/enums';
import { Pedido } from './Pedido';

@Entity('andamento_pedido')
export class AndamentoPedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', name: 'etapa_atual' })
    etapaAtual: EtapaPedido

    @Column({ type: 'timestamp', name: 'data_hora_mudanca'})
    dataHoraMudanca: Date

    @ManyToOne(() => Pedido, pedido => pedido.andamentoPedido)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido
}
