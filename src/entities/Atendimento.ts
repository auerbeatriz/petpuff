import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from './Cliente';
import { Funcionario } from './Funcionario';
import { Orcamento } from './Orcamento';

@Entity('atendimento')
export class Atendimento {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente

    @ManyToOne(() => Funcionario)
    @JoinColumn({ name: 'id_funcionario' })
    funcionario: Funcionario

    @Column({ type: 'integer', name: 'numero_atendimento' })
    numeroAtendimento: number

    @OneToMany(() => Orcamento, orcamento => orcamento.atendimento)
    orcamentos: Orcamento[]

    @Column({ name: 'esta_aberto', type: 'boolean' })
    estaAberto: boolean
}
