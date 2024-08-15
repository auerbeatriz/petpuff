import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import 'reflect-metadata'

dotenv.config()

export const DataBaseConnection = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL ?? '',
    logging: true,
    synchronize: true,
    entities: [`${__dirname}/**/entities/*.{ts,js}`]
})