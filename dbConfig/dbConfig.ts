import { Pool } from "pg";
import dotenv from 'dotenv'

dotenv.config()

// Função para se conectar ao banco de dados
export default async function dbConnect(): Promise<Pool> {
    // Extrair as informações da URL de conexão
    const dbUrl = process.env.DB_URL

    if(!dbUrl){
        throw new Error('A variável de ambiente DB_URL não está definida')
    }

    const pool = new Pool({
        connectionString : dbUrl,
    })

    // Testar a conexão
    try {
        await pool.query('SELECT 1');
        console.log("Conexão com o banco de dados bem-sucedida!");
        return pool;
    } catch(error) {
        console.error("Erro ao conectar-se ao banco de dados: ", error);
        throw error; 
    }
}
