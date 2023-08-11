import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from "../schema/user";
import { createDbConnection } from './db';
import { logger } from './logger';
import util from 'util';

// Serialize and deserialize user for session management
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const client = await createDbConnection();
        try {
            const { rows: results } = await client.query<User>({
                text: `SELECT id, username, password FROM users WHERE id=$1`,
                values: [id],
            });
            if (!results.length) return done(null, false);
            const [ user ] = results;
            done(null, user);
        } catch (e) {
            const error = util.inspect(e);
            logger.error(error);
            return done(e, false)
        } finally {
            client.release();
        }
});

// Local strategy setup
passport.use(
    new LocalStrategy.Strategy(async (username, password, done) => {
        const client = await createDbConnection();
        try {
            const { rows: results } = await client.query<User>({
                text: `SELECT id, username, password FROM users WHERE username=$1`,
                values: [username],
            });
            if (!results.length) return done(null, false);
            const [ user ] = results;
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) return done(err);
                if (!result) return done(null, false);
                return done(null, user);
            });
        } catch (e) {
            const error = util.inspect(e);
            logger.error(error);
            return done(e)
        } finally {
            client.release();
        }
    })
);

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Access Denied' });
    }
    
    // If the session is authenticated, continue to the next middleware
    next();
};