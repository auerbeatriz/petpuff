import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import 'reflect-metadata'

dotenv.config();

const conn = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL ?? '',
    logging: true,
    synchronize: true
})

conn.initialize()
    .then(() => { console.log('Conexão com o banco de dados bem-sucedida.') })
    .catch(error => { console.log('Falha de conexão com o banco de daods. Erro: ', error) })

export default conn