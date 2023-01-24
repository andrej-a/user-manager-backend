import { Express } from 'express-serve-static-core';
import { getAllUsers, signUp, deleteUser, signIn, changeUserStatus } from '../controller/usersController';
import passport from 'passport';

const route = (app: Express) => {
    app.route('/api/auth/signin').put(signIn);
    app.route('/api/auth/signup').post(signUp);

    app.route('/api/users').get(passport.authenticate('jwt', {session: false}), getAllUsers);
    app.route('/api/users').delete(passport.authenticate('jwt', {session: false}), deleteUser);
    app.route('/api/users').put(passport.authenticate('jwt', {session: false}), changeUserStatus);
};

export default route;
