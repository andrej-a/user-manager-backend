import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import bycrypt from 'bcryptjs';
import responce from '../responce';
import connection from '../settings/db';
import { IUser } from '../models/user';
import { statusCodes, date, SQL_REQUESTS, CONNECTION_INFORMATION } from '../models/constants';

const { SUCCESS, CREATED, NO_CONTENT, BAD_REQUEST, NO_DATA, SERVER_ERROR } = statusCodes;
const { DATE_FORMAT, NOT_LOGIN_INFORMATION } = date;
const { GET_ALL_USERS, INSERT_USER, GET_USER_BY_EMAIL, UPDATE_LOGIN_DATE } = SQL_REQUESTS;
const { INCORRECT_PASSWORD } = CONNECTION_INFORMATION;

export const getAllUsers = (
    req: any,
    res: { json: (arg0: { status: number; values: any }) => void; end: () => void }
) => {
    connection.query(GET_ALL_USERS, (error, rows) => {
        if (error) {
            responce(SERVER_ERROR, { message: `${error.sqlMessage}` }, res);
            return;
        }
        responce(SUCCESS, rows, res);
    });
};

export const signUp = (
    req: { body: IUser },
    res: { json: (arg0: { status: number; values: any }) => void; end: () => void }
) => {
    const { FirstName, Email, UserStatus, Password } = req.body;
    const Id = uuidv4();
    const RegistrationDate = format(new Date(), DATE_FORMAT);
    const LastLoginDate = NOT_LOGIN_INFORMATION;

    const salt = bycrypt.genSaltSync(Number(process.env.bycrypt_rounds));
    const hashingPassword = bycrypt.hashSync(Password!, salt);

    connection.query(
        INSERT_USER,
        [Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus, hashingPassword],
        (error) => {
            if (error) {
                responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
                return;
            }
            responce(CREATED, { Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus }, res);
        }
    );
};

export const signIn = (req: { body: { Email: string; Password: string } }, res: any) => {
    const { Email, Password } = req.body;
    connection.query(GET_USER_BY_EMAIL, [Email], (error, rows: IUser[]) => {
        if (error) {
            responce(SERVER_ERROR, { message: `${error.sqlMessage}` }, res);
            return;
        }
        if (!rows.length) {
            responce(NO_DATA, { message: `User with ${Email} is not exist` }, res);
            return;
        }
        const correctPassword = bycrypt.compareSync(Password, rows[0].Password!);
        if (!correctPassword) {
            responce(BAD_REQUEST, { message: INCORRECT_PASSWORD }, res);
            return;
        }

        const loginDate = format(new Date(), DATE_FORMAT);
        connection.query(UPDATE_LOGIN_DATE, [loginDate, Email], (error, rows) => {
            if (error) {
                responce(SERVER_ERROR, { message: `${error.sqlMessage}` }, res);
                return;
            }
            connection.query(GET_USER_BY_EMAIL, [Email], (error, rows: IUser[]) => {
                if (error) {
                    responce(SERVER_ERROR, { message: `${error.sqlMessage}` }, res);
                    return;
                }
                const { Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus } = rows[0];
                const jwt = require('jsonwebtoken');
                const userToken = jwt.sign(
                    {Id, Email},
                    process.env.jwt,
                    {expiresIn: 60 * 120}
                );
                responce(SUCCESS, {token: `Bearer ${userToken}`, Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus}, res)
            })
        });
    });
};

export const deleteUser = (req: { body: string[] }, res: any) => {
    const id = req.body;
    const deletedValues: string[] = [];
    id.forEach((item) => {
        const sql = `DELETE FROM users WHERE Id='${item}';`;
        connection.query(sql, (error) => {
            if (error) {
                responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
                return;
            }
            deletedValues.push(item);
        });
    });
    console.log(deletedValues);

    responce(NO_CONTENT, { message: `Values were deleted!` }, res);
};

export const changeUserStatus = (req: { body: { id: string[]; status: string } }, res: any) => {
    const { id, status } = req.body;
    id.forEach((item) => {
        const sql = `
        UPDATE users
        SET UserStatus = '${status}'
        WHERE Id = '${item}';
        `;
        connection.query(sql, (error) => {
            if (error) {
                responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
                return;
            }
        });
    });
    responce(SUCCESS, { message: `${id} was updated` }, res);
};
