import { Pool, PoolClient } from "pg";

export const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

export const createDbConnection = async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
};
