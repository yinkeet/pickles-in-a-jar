import { Pool, PoolClient } from "pg";
import { Email } from "../schema/email";
import { logger } from "./logger";
import util from 'util';

export const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

export const createDbConnection = async (): Promise<PoolClient> => {
    const client = await pool.connect();
    return client;
};

type InsertResults = {
    id: string;
}

export async function saveEmail(email: Email) {
    logger.info(email);
    const { from, to, subject, text } = email

    const client = await createDbConnection();
    try {
        const { rows } = await client.query<InsertResults>({
            text: `INSERT INTO "mails" ("from", "to", "subject", "text") VALUES ($1, $2, $3, $4) RETURNING "id"`,
            values: [from, to, subject, text],
        });
        logger.info('Saved to DB');
        return rows[0].id;
    } catch (error: any) {
        const inspectedError = util.inspect(error);
        logger.error(inspectedError);
        return null;
    } finally {
        client.release();
    }
}