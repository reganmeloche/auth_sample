import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import { Connection } from "typeorm";

import passportInit from './lib/passportInit';
import claims from './lib/claims';
import routes from './handlers/_routes';
import install from './dependencies';

export default function (connection: Connection) {
    const dependencies = install(connection);
    passportInit(dependencies.authLib);
    
    // Setup
    const app = express();
    app.set('port', (process.env.PORT || 3500));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Auth setup
    app.use(passport.initialize());
    claims(app);

    // Access headers
    app.use((req, res, next)  => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,accept,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
    
    routes(app, dependencies);

    app.listen(app.get('port'), () => {
        // eslint-disable-next-line no-console
        console.log(`Listening on port: ${app.get('port')}`);
    });
    return app;
}

