import { handleError } from '../lib/utilities';
import { ValidationError, Unauthorized, NotFound } from '../common/Errors';
import ITask from '../lib/ITask';

export default function (app: any, taskLib: ITask) {
    app.get('/api/task', async (req: any, res: any) => {
        try {
        	const result = await taskLib.getByUserId(req.userId);
            res.status(200).send(result);
        } catch (err) {
            handleTaskError(err, res);
    	}
    });

    app.post('/api/task', async (req: any, res: any) => {
        try {
        	const result = await taskLib.create(req.body, req.userId);
            res.status(201).send(result);
        } catch (err) {
            handleTaskError(err, res);
    	}
    });

    app.put('/api/task/:id/complete', async (req: any, res: any) => {
        try {
          	await taskLib.complete(req.params.id, req.userId);
          	res.status(201).send({ updated: true });
        } catch (err) {
            handleTaskError(err, res);
        }
    });

    app.delete('/api/task/:id', async(req: any, res: any) => {
        try {
            await taskLib.delete(req.params.id, req.userId);
          	res.status(200).send({ deleted: true });
      	} catch (err) {
            handleTaskError(err, res);
      	}
    });

    const handleTaskError = (err, res) => {
        handleError(err);
        let status = 500;
        if (err instanceof ValidationError || err instanceof NotFound) {
            status = 400;
        }
        res.status(status).send({ message: err.message });
    }
}
