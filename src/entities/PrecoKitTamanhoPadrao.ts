import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { KitMaterial } from './KitMaterial';
import { Tamanho } from './Tamanho';

@Entity('preco_kit_tamanhopadrao')
export class PrecoKitTamanhoPadrao {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => KitMaterial, kitMaterial => kitMaterial.precoTamanhoPadrao)
    @JoinColumn({ name: 'id_kitmaterial' })
    kitMaterial: KitMaterial

    @ManyToOne(() => Tamanho, tamanho => tamanho.precoTamanhoPadrao)
    @JoinColumn({ name: 'id_tamanho' })
    tamanho: Tamanho

    @Column({ type: 'double precision' })
    valor: number
}
