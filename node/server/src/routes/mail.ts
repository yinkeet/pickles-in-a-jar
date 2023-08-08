import express, { Request, Response } from 'express';
import events from 'events';
import { saveEmail } from './../services/db';
import { queueEmail } from '../services/queue';
import { Email } from '../schema/email';

export const router = express.Router();
const eventEmitter = new events.EventEmitter();

router.post('/api/v1/email', (req: Request, res: Response) => {
    const { from, to, subject, text } = req.body;
    eventEmitter.emit('post_email', { from, to, subject, text });
    return res.status(204).send();
});

eventEmitter.on('post_email', async (email: Email) => {
    const id = await saveEmail(email);
    await queueEmail(id!, email);
});
