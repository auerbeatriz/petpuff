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

    @Column({ type: 'varchar', length: 10, name: 'numero_atendimento' })
    numeroAtendimento: string

    @OneToMany(() => Orcamento, orcamento => orcamento.atendimento)
    orcamentos: Orcamento[]
}
