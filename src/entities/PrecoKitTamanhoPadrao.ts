import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { KitMaterial } from './KitMaterial';
import { Tamanho } from './Tamanho';

@Entity('preco_kit_tamanhopadrao')
export class PrecoKitTamanhoPadrao {
    @PrimaryColumn({type: 'integer'})
    @ManyToOne(() => KitMaterial, kitMaterial => kitMaterial.precoTamanhoPadrao)
    @JoinColumn({ name: 'id_kitmaterial' })
    kitMaterial: KitMaterial

    @PrimaryColumn({type: 'integer'})
    @ManyToOne(() => Tamanho, tamanho => tamanho.precoTamanhoPadrao)
    @JoinColumn({ name: 'id_tamanho' })
    tamanho: Tamanho

    @Column({ type: 'double precision' })
    valor: number
}
