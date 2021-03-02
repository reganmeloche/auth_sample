import passport from 'passport';
import jwt from "jsonwebtoken";
import keys from '../config/keys';
import { handleError } from '../lib/utilities';
import IAuth from '../lib/IAuth';
import { ValidationError } from '../common/Errors';

export default function (app: any, authLib: IAuth) {
    app.post('/api/login', async (req: any, res: any, next: any) => { 
        try {
            passport.authenticate('local', { session: false }, (err: any, user: any) => {
                if (err || !user) {
                    const message = (err && err.message) || 'Invalid login';
                    return res.status(400).send({ message });
                }
                req.login(user, { session: false }, (loginErr: any) => {
                    if (loginErr) { 
                        return res.status(400).send({ message: loginErr.message });
                    } 
                    const userObj = JSON.parse(JSON.stringify(user));
                    const expiresIn = keys.tokenExpiryMs;
                    const token = jwt.sign(userObj, keys.jwtSecret, { expiresIn });
                    return res.status(200).send({user, token, expiresIn, success: true });
                });
            })(req, res, next)
        }
        catch(err) {
            handleError(err);
            res.status(500).send({error: err.message});
        }
    });

    app.post('/api/user', async (req: any, res: any) => {
        try {
            const claims = ['regular'];
            const userId = await authLib.createUser(req.body, claims);
            res.status(201).send(userId);
        }
        catch (err) {
            handleError(err);
            if (err instanceof ValidationError) {
                res.status(400).send({message: err.message });
            } else {
                res.status(500).send();
            }
        }
    });

    app.post('/api/change_password', async (req: any, res: any) => {
        const { email, password, newPassword } = req.body;

        try {
            await authLib.changePassword(email, password, newPassword);
            req.logout();
            res.status(200).send({success: true});
        }
        catch (err) {
            handleError(err);
            if (err instanceof ValidationError) {
                res.status(400).send({message: err.message, myErr: err.message });
            } else {
                res.status(500).send();
            }
        }
    });

    app.get('/api/fetch_user', (req: any, res: any) => {
        res.status(200).send(req.user);
    });

    app.get('/api/logout', (req: any, res: any) => {
        req.logout();
        // TODO: Add a blacklist to the db - maybe in redis with ttl
        res.status(200).send({ message: 'logged out' });
    });
}
