import express, { Request, Response } from 'express';
import { authenticateMiddleware } from './../services/auth';
import passport from 'passport';
import { User } from '../schema/user';

export const router = express.Router();

router.post('/api/v1/login', passport.authenticate('local'), (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({ message: 'Login successful!', user: {
        id: user.id,
        username: user.username,
    } });
});

router.post('/api/v1/logout', (req: Request, res: Response, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Logged out!' });
    });
});

router.get('/api/v1/profile', authenticateMiddleware, (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({ 
        user: {
            id: user.id,
            username: user.username,
        }
    });
});