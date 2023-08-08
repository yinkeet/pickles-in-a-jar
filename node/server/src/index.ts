import express, { Request, Response } from 'express';
import { logger } from "./services/logger";
import { router as mailRoute } from './routes/mail';

export const app = express();
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mailRoute);

export const server = app.listen(port, () => {
    logger.info(`Server is listening at http://localhost:${port}`);
});
