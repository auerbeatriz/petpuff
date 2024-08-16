import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Entrega } from './Entrega';
import { Pagamento } from './Pagamento';
import { Devolucao } from './Devolucao';
import { Orcamento } from './Orcamento';

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamp', nullable: true, name: 'data_realizacao' })
    dataRealizacao: Date

    @Column({ type: 'double precision', nullable: true, name: 'valor_total' })
    valorTotal: number

    @OneToMany(() => Orcamento, orcamento => orcamento.pedido)
    orcamentos: Orcamento[]

    @OneToOne(() => Entrega, entrega => entrega.pedido)
    entrega: Entrega

    @OneToOne(() => Pagamento, pagamento => pagamento.pedido)
    pagamento: Pagamento

    @OneToOne(() => Devolucao, devolucao => devolucao.pedido)
    devolucao: Devolucao
}
