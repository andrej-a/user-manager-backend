export interface IUser {
    Id: string;
    FirstName: string;
    Email: string;
    Password?: string;
    RegistrationDate: string;
    LastLoginDate: string;
    UserStatus: string;
}