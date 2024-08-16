import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Login {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    login: string

    @Column({ type: 'varchar', length: 255 })
    token: string
}
