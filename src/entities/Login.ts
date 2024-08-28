import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('login')
export class Login {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255, nullable: true })
    login: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    token: string

    @Column({type: 'boolean', nullable: true})
    staff: boolean
}
