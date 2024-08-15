import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PrecoKitTamanhoPadrao } from "./PrecoKitTamanhoPadrao"

@Entity('tamanho')
export class Tamanho {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'decimal'})
    altura: number

    @Column({type: 'varchar'})
    nome: string

    @Column({ type: 'boolean'})
    padrao: boolean

    @OneToMany(() => PrecoKitTamanhoPadrao, precoKitTamanhoPadrao => precoKitTamanhoPadrao.tamanho)
    precoTamanhoPadrao: PrecoKitTamanhoPadrao[]
}