import Queue from 'bull';
import { Email } from '../schema/email';
import { logger } from './logger';

const emailQueue = new Queue('email', { 
    redis: { 
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'), 
        password: process.env.REDIS_PASSWORD
    } 
});

export async function queueEmail(id: string, email: Email) {
    emailQueue.add({ id, ...email });
    logger.info('Queued');
};