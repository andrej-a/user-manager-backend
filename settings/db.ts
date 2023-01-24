import mysql from 'mysql';
import * as dotenv from 'dotenv';
import { CONNECTION_INFORMATION } from '../models/constants';

const { SUCCESS_CONNECTION } = CONNECTION_INFORMATION;
dotenv.config();

const connection: mysql.Connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect(async (err) => {
    if (err) {
        console.log(`Error with ${err}`);
    } else {
        console.log(SUCCESS_CONNECTION);
    }
});

export default connection;
