import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusOrcamento } from '../types/enums';
import { Pedido } from './Pedido';
import { Atendimento } from './Atendimento';
import { Pelucia } from './Pelucia';

@Entity('orcamento')
export class Orcamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', name: 'numero_orcamento'})
    numeroOrcamento: string

    @Column({type: 'date', name: 'data_solicitacao'})
    dataSolicitacao: Date

    @Column({type: 'date', name: 'data_retorno'})
    dataRetorno: Date

    @Column({type: 'double precision'})
    valor: number

    @Column({type: 'date', name: 'prazo_confeccao'})
    prazoConfeccao: Date

    @Column({type: 'text', name: 'informacoes_adicionais'})
    informacoesAdicionais: string

    @Column({type: 'date', name: 'data_expiracao'})
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