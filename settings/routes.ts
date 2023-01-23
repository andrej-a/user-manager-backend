import { Express } from 'express-serve-static-core';
import index from '../controller/indexController';
import { getUsers, addUser, deleteUser, loginUser, changeUserStatus } from '../controller/usersController';

const route = (app: Express) => {
    app.route('/').get(index);
    app.route('/users').get(getUsers);
    app.route('/users').post(addUser);
    app.route('/users').delete(deleteUser);
    app.route('/users/login').put(loginUser);
    app.route('/users').put(changeUserStatus);
};

export default route;
