import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './Cliente';
import { Funcionario } from './Funcionario';

@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true , nullable: true})
    username: string;

    @Column({nullable: true})
    password: string;

    @OneToOne(() => Cliente, cliente => cliente.login)
    cliente: Cliente;

    @OneToOne(() => Funcionario, funcionario => funcionario.login)
    funcionario: Funcionario;
}
