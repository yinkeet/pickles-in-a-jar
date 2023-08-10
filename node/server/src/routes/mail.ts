import express, { Request, Response } from 'express';
import events from 'events';
import { saveEmail } from './../services/db';
import { queueEmail } from '../services/queue';
import { Email, EmailSchema } from '../schema/email';
import { logger } from '../services/logger';
import { createDbConnection } from './../services/db';
import util from 'util';

export const router = express.Router();
const eventEmitter = new events.EventEmitter();

router.post('/api/v1/email', (req: Request, res: Response) => {
    const { from, to, subject, text } = req.body;
    eventEmitter.emit('post_email', { from, to, subject, text });
    return res.status(204).send();
});

eventEmitter.on('post_email', async (email: Email) => {
    // Validate email object and silently exit if an error occurs
    const { error } = EmailSchema.validate(email)
    if (error) {
        return;
    }
    // Save the email into db, and use the id generated to queue the email job
    // The id is later consumed and used to update the db records
    const id = await saveEmail(email);
    await queueEmail(id!, email);
});

router.get('/api/v1/emails', async (req: Request, res: Response) => {
    const client = await createDbConnection();
    try {
        const { rows: results } = await client.query(`SELECT a.id, a.from, a.to, a.subject, a.text, a.status, b.response::text, a.created_at, b.created_at AS updated_at FROM mails a JOIN mails_responses b ON a.id=b.id`)
        return res.json({
            'results': results
        })
    } catch (e) {
        const error = util.inspect(e);
        logger.error(error)
        return res.status(500).json({
            error
        })
    } finally {
        client.release();
    }
});
