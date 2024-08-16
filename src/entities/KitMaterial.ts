import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Material } from './Material';
import { PrecoKitTamanhoPadrao } from './PrecoKitTamanhoPadrao';

@Entity('kit_material')
export class KitMaterial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    nome: string;

    @ManyToMany(() => Material, material => material.kits)
    @JoinTable({
        name: 'Material_KitMaterial',
        joinColumn: { name: 'id_kit_material', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'id_material', referencedColumnName: 'id' }
    })
    materiais: Material[];

    @OneToMany(() => PrecoKitTamanhoPadrao, precoKitTamanhoPadrao => precoKitTamanhoPadrao.kitMaterial)
    precoTamanhoPadrao: PrecoKitTamanhoPadrao[];
}
