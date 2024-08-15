import app from './app'
import { DataBaseConnection } from './config/typeorm';

const port = process.env.PORT || 3000

DataBaseConnection.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log('Aplicação PetPuff executando na porta ', port);
        })
    })
    .catch(error => { console.log('Falha de conexão com o banco de daods. Erro: ', error) })
