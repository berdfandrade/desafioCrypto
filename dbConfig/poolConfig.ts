import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config()

const poolConfig = {
    connectionString : process.env.DB_URL,
    max : 20,
    idleTimeoutMillis: 30000
}

const pool = new Pool(poolConfig)

export default pool;