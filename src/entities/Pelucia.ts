import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tamanho } from './Tamanho';
import { KitMaterial } from './KitMaterial';
import { Orcamento } from './Orcamento';

@Entity
export class Pelucia {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    nome: string

    @Column({type: 'text'})
    detalhes: string

    @Column({type: 'varchar'})
    nome_presenteado: string

    @Column({type: 'varchar'})
    mensagem_presente: string

    @ManyToOne(() => KitMaterial)
    @JoinColumn({name: 'id_kit_material'})
    kitMaterial: KitMaterial

    @ManyToOne(() => Tamanho)
    @JoinColumn({name: 'id_tamanho'})
    tamanho: Tamanho

    @OneToMany(() => Orcamento, orcamento => orcamento.pelucia)
    orcamentos: Orcamento[]
}