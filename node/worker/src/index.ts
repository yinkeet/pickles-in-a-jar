import express from 'express';
import { logger } from "./services/logger";
import { router as healthRoute } from './routes/health';
import './services/queue';

export const app = express();
const port = 9000;

app.use('/', healthRoute);

export const server = app.listen(port, () => {
    logger.info(`Server is listening at http://localhost:${port}`);
});
