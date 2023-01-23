export enum statusCodes {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
}

export enum date {
    DATE_FORMAT = 'yyyy-MM-dd',
    NOT_LOGIN_INFORMATION = 'not-login-yet',
}

export enum SQL_REQUESTS {
    GET_ALL_USERS = 'SELECT `Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus` FROM `users`',
    INSERT_USER = 'INSERT INTO `users`(`Id`, `FirstName`, `Email`, `RegistrationDate`, `LastLoginDate`, `UserStatus`, `Password`) VALUES' +
    `(?, ?, ?, ?, ?, ?, ?)`,

}

export enum CONNECTION_INFORMATION {
    SUCCESS_CONNECTION = 'Success connection!',
}
