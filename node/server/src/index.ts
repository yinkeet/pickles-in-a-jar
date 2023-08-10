import express from 'express';
import { logger } from "./services/logger";
import { router as mailRoute } from './routes/mail';
import { router as authRoute } from './routes/auth';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

export const app = express();
const port = 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true }));
app.use(cors({
    origin: process.env.CORS_ALLOW_ORIGINS,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', mailRoute);
app.use('/', authRoute);

export const server = app.listen(port, () => {
    logger.info(`Server is listening at http://localhost:${port}`);
});
