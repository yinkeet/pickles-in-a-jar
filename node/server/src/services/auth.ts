import { Request, Response, NextFunction } from 'express';
import passport from "passport";
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from "../schema/user";

// User object to simulate a database
const users: Array<User> = [
    { id: '1', username: 'user1', password: '$2b$10$ryDinNiIOuOpV9U6BPLZD.Fi2Zq2ifKb2WCMDvCv8TYvONw2HBEDm' }, // password: secret1
    { id: '2', username: 'user2', password: '$2b$10$Ma/EenUzNZj3QELvXbGrj.kRXF98R0auLVhCsHhrO7eWf1wQrLoZi' }, // password: secret2
];

// Serialize and deserialize user for session management
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((user) => user.id === id);
    done(null, user);
});

// Local strategy setup
passport.use(
    new LocalStrategy.Strategy((username, password, done) => {
        const user = users.find((user) => user.username === username);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) return done(err);
            if (!result) return done(null, false);
            return done(null, user);
        });
    })
);

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Access Denied' });
    }
    
    // If the session is authenticated, continue to the next middleware
    next();
};