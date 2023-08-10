import Queue, { Job, JobPromise } from 'bull';
import nodemailer from 'nodemailer';
import { logger } from './logger';
import { updateDeliveryStatus, saveResponse } from './db';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const emailQueue = new Queue('email', {
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD
    }
});

emailQueue.process(async (job: Job): Promise<SMTPTransport.SentMessageInfo> => {
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: parseInt(process.env.NODEMAILER_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USERNAME,
          pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const { from, to, subject, text } = job.data;

    return await transporter.sendMail({
        from,
        to,
        subject,
        text
    });
});

emailQueue.on('active', async (job: Job, _jobPromise: JobPromise) => {
    const { id } = job.data;
    await updateDeliveryStatus(id, 'sending');
});

emailQueue.on('failed', async (job: Job, _err: Error) => {
    const { id } = job.data;
    await updateDeliveryStatus(id, 'failed');
});

emailQueue.on('completed', async (job: Job, result: SMTPTransport.SentMessageInfo) => {
    logger.debug(job.data);
    logger.debug(result);
    const { id } = job.data;
    const response = process.env.NODE_ENV === 'development' ? { preview_url: nodemailer.getTestMessageUrl(result), ...result } : { ...result };
    await Promise.all([
        updateDeliveryStatus(id, 'sent'),
        saveResponse(id, response)
    ]);
})