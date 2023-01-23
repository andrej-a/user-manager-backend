export enum statusCodes {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NO_DATA = 404,
    SERVER_ERROR = 500,
}

export enum date {
    DATE_FORMAT = 'yyyy-MM-dd',
    NOT_LOGIN_INFORMATION = 'not-login-yet',
}

export enum SQL_REQUESTS {
    GET_ALL_USERS = 'SELECT `Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus` FROM `users`',
    INSERT_USER = 'INSERT INTO `users`(`Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus`, `Password`) VALUES' +
    `(?, ?, ?, ?, ?, ?, ?)`,
    GET_USER_BY_EMAIL = `SELECT * FROM users WHERE Email = ?`,
    UPDATE_LOGIN_DATE = `UPDATE users SET LastLoginDate = ? WHERE Email = ?`
}

export enum CONNECTION_INFORMATION {
    SUCCESS_CONNECTION = 'Success connection!',
    INCORRECT_PASSWORD = `Incorrect password`,
}
