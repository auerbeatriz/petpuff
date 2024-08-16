import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Entrega } from './Entrega';
import { EtapaEntrega } from '../types/enums';

@Entity('andamento_entrega')
export class AndamentoEntrega {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', name: 'etapa_atual' })
    etapaAtual: EtapaEntrega

    @Column({ type: 'timestamp', name: 'data_hora_mudanca'})
    dataHoraMudanca: Date

    @ManyToOne(() => Entrega, entrega => entrega.andamentoEntrega)
    @JoinColumn({ name: 'id_entrega' })
    entrega: Entrega
}
