import Queue, { Job, JobId, JobPromise } from 'bull';
import { Email } from '../schema/email';
import { logger } from './logger';
import WebSocket from 'ws';

const emailQueue = new Queue('email', { 
    redis: { 
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'), 
        password: process.env.REDIS_PASSWORD
    } 
});

export async function queueEmail(id: string, email: Email) {
    emailQueue.add({ id, ...email });
    logger.debug('Queued');
};

const wss = new WebSocket.Server({ port: 9001 });

wss.on('connection', (ws) => {
    emailQueue.on('global:active', async (jobId: JobId, _jobPromise: JobPromise) => {
        const job = await emailQueue.getJob(jobId);
        const { id } = job!.data;
        ws.send(`Sending email: ${id}`);
    });
    emailQueue.on('global:completed', async (jobId: JobId, result: string) => {
        const resultJSON = JSON.parse(result);
        logger.debug('123');
        logger.debug(resultJSON);
        const job = await emailQueue.getJob(jobId);
        const { id } = job!.data;
        let msg = `Sent email: ${id}`;
        if (process.env.NODE_ENV === 'development') {
            msg += `, Preview URL: ${resultJSON['preview_url']}`
        }
        ws.send(msg);
    })
});