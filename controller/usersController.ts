import responce from "../responce";
import connection from '../settings/db';
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';

export const getUsers = (req: any, res: { json: (arg0: { status: number; values: any; }) => void; end: () => void; }) => {
    connection.query('SELECT * FROM `users`', (error, rows, fields) => {
        if (error) {
            console.log(error);
            return;
        }
        responce(rows, res);
    })
}

export const addUser = (req: any, res: any) => {
    const {FirstName, Email, Password, UserStatus} = req.body;
    const Id = uuidv4();
    const RegistrationDate = format(new Date(), 'yyyy-MM-dd');
    const LastLoginDate = 'not-login-yet';
    const sql = "INSERT INTO `users`(`Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus`) VALUES" + `('${Id}', '${FirstName}', '${Email}', '${RegistrationDate}', '${LastLoginDate}', '${UserStatus}')`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        responce({Id, FirstName, Email, RegistrationDate, LastLoginDate, UserStatus}, res);
    })
}
