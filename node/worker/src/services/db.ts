import { Pool, PoolClient } from "pg";
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

export async function updateDeliveryStatus(id: string, status: string) {
    const client = await createDbConnection();
    try {
        await client.query({
            text: `UPDATE "mails" SET status=$1, updated_at=NOW() WHERE id=$2`,
            values: [status, id],
        });
        logger.debug(`Updated delivery status of ${id} to ${status}`);
    } catch (error: any) {
        const inspectedError = util.inspect(error);
        logger.error(inspectedError);
        return null;
    } finally {
        client.release();
    }
}

export async function saveResponse(id: string, response: Object) {
    const client = await createDbConnection();
    try {
        await client.query({
            text: `INSERT INTO "mails_responses" ("id", "response") VALUES ($1, $2)`,
            values: [id, response],
        });
        logger.debug(`Saved response of ${id}`);
    } catch (error: any) {
        const inspectedError = util.inspect(error);
        logger.error(inspectedError);
        return null;
    } finally {
        client.release();
    }
}