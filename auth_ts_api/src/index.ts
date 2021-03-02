import "reflect-metadata";
import {createConnection} from "typeorm";
import server from './app';

createConnection().then(async connection => {
    server(connection);
}).catch(error => console.log(error));

