import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusOrcamento } from '../types/enums';
import { Pedido } from './Pedido';
import { Atendimento } from './Atendimento';
import { Pelucia } from './Pelucia';

@Entity('orcamento')
export class Orcamento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    numero_orcamento: string

    @Column({type: 'date'})
    data_solicitacao: Date

    @Column({type: 'date'})
    data_retorno: Date

    @Column({type: 'double precision'})
    valor: number

    @Column({type: 'date'})
    prazo_confeccao: Date

    @Column({type: 'text'})
    informacoes_adicionais: string

    @Column({type: 'date'})
    data_expiracao: Date

    @Column({type: 'varchar'})
    status: StatusOrcamento

    @Column({type: 'integer'})
    id_orcamento_anterior: number

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