import express, { Request, Response } from 'express';
import os from 'os';

export const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
    return res.json({
        uptime: os.uptime()
    });
});