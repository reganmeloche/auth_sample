import { handleError } from '../lib/utilities';
import IAuth from '../lib/IAuth';
import IUser from '../lib/IUser';
import { ValidationError } from '../common/Errors';

export default function (app: any, authLib: IAuth, userLib: IUser) {
    app.post('/api/admin', async (req: any, res: any) => {
        try {
            const claims = ['regular', 'admin'];
            const userId = await authLib.createUser(req.body, claims);
            res.status(201).send({ userId });
        }
        catch (err) {
            handleError(err);
            if (err instanceof ValidationError) {
                res.status(400).send({message: err.message });
            } else {
                res.status(500).send({error: err.message});
            }
        }
    });

    app.get('/api/user', async (req: any, res: any) => {
        try {
            const result = await userLib.getAll();
            res.status(200).send(result);
        }
        catch (err) {
            handleError(err);
            if (err instanceof ValidationError) {
                res.status(400).send({message: err.message, myErr: err.message });
            } else {
                res.status(500).send({error: err.message});
            }
        }
    });

}
