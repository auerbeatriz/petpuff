import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusOrcamento } from '../types/enums';
import { Pedido } from './Pedido';
import { Atendimento } from './Atendimento';
import { Pelucia } from './Pelucia';

@Entity('orcamento')
export class Orcamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer', name: 'numero_orcamento' })
    numeroOrcamento: number

    @Column({type: 'date', name: 'data_solicitacao'})
    dataSolicitacao: Date

    @Column({type: 'date', name: 'data_retorno', nullable: true})
    dataRetorno: Date

    @Column({type: 'double precision', nullable: true})
    valor: number

    @Column({type: 'date', name: 'prazo_confeccao', nullable: true})
    prazoConfeccao: Date

    @Column({type: 'text', name: 'informacoes_adicionais', nullable: true})
    informacoesAdicionais: string

    @Column({type: 'date', name: 'data_expiracao', nullable: true})
    dataExpiracao: Date

    @Column({type: 'varchar'})
    status: StatusOrcamento

    @ManyToOne(() => Orcamento, orcamento => orcamento.novasCotacoes)
    @JoinColumn({name: 'id_orcamento_anterior'})
    orcamentoAnterior: Orcamento

    @OneToMany(() => Orcamento, orcamento => orcamento.orcamentoAnterior)
    novasCotacoes: Orcamento[]

    @ManyToOne(() => Pelucia, pelucia => pelucia.orcamentos)
    @JoinColumn({name: 'id_pelucia'})
    pelucia: Pelucia

    @ManyToOne(() => Pedido, pedido => pedido.orcamentos)
    @JoinColumn({name: 'id_pedido'})
    pedido: Pedido

    @ManyToOne(() => Atendimento, atendimento => atendimento.orcamentos)
    @JoinColumn({name: 'id_atendimento'})
    atendimento: Atendimento
}