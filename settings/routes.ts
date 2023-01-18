import { Express } from 'express-serve-static-core';
import index from '../controller/indexController';
import users from '../controller/usersController';

const route = (app: Express) => {
    app.route('/').get(index);
    app.route('/users').get(users);
};

export default route;
