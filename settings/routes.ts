import { Express } from 'express-serve-static-core';
import { getAllUsers, signUp, deleteUser, signIn, changeUserStatus } from '../controller/usersController';

const route = (app: Express) => {
    app.route('/api/users').get(getAllUsers);
    app.route('/api/auth/signup').post(signUp);
    app.route('/api/users').delete(deleteUser);
    app.route('/api/auth/signin').put(signIn);
    app.route('/api/users').put(changeUserStatus);
};

export default route;
