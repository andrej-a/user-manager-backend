import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import responce from '../responce';
import connection from '../settings/db';
import { IUser } from '../models/user';
import { statusCodes, date } from '../models/constants';

const { SUCCESS, BAD_REQUEST, NO_CONTENT } = statusCodes;
const { DATE_FORMAT, NOT_LOGIN_INFORMATION } = date;

export const getUsers = (req: any, res: { json: (arg0: { status: number; values: any }) => void; end: () => void }) => {
    connection.query('SELECT * FROM `users`', (error, rows) => {
        if (error) {
            responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
            return;
        }
        responce(SUCCESS, rows, res);
    });
};

export const addUser = (
    req: { body: IUser },
    res: { json: (arg0: { status: number; values: any }) => void; end: () => void }
) => {
    const { FirstName, Email, UserStatus } = req.body;
    const Id = uuidv4();
    const RegistrationDate = format(new Date(), DATE_FORMAT);
    const LastLoginDate = NOT_LOGIN_INFORMATION;
    const sql =
        'INSERT INTO `users`(`Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus`) VALUES' +
        `('${Id}', '${FirstName}', '${Email}', '${RegistrationDate}', '${LastLoginDate}', '${UserStatus}')`;

    connection.query(sql, (error) => {
        if (error) {
            responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
            return;
        }
        responce(SUCCESS, { Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus }, res);
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

export const loginUser = (req: { body: { Email: string; Password: string } }, res: any) => {
    const { Email, Password } = req.body;
    const sql = `
        UPDATE users
        SET LastLoginDate = '${format(new Date(), DATE_FORMAT)}'
        WHERE Email = '${Email}';
    `;
    connection.query(sql, (error) => {
        if (error) {
            responce(BAD_REQUEST, { message: `${error.sqlMessage}` }, res);
            return;
        }

        responce(SUCCESS, { message: `${Email} was updated` }, res);
    });
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
