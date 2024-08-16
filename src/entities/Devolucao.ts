import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Pedido } from './Pedido';

@Entity('devolucao')
export class Devolucao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', nullable: true, name: 'data_solicitacao' })
    dataSolicitacao: Date

    @Column({ type: 'timestamp', nullable: true, name: 'data_postagem' })
    dataPostagem: Date

    @Column({ type: 'varchar', length: 25, nullable: true, name: 'codigo_correios' })
    codigoCorreios: string

    @OneToOne(() => Pedido, pedido => pedido.devolucao)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido
}
