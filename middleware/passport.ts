import { PassportStatic } from "passport";
import connection from "../settings/db";

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwt 
}

const strategy = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(options, (payload: { Id: any; }, done: any) => {
            try {
                connection.query(`SELECT 'Id', 'Email' from users WHERE 'Id' = '${payload.Id}'`, (error, rows) => {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    const user = rows;
                    if (user) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
            } catch (error) {
                console.log(error);
                
            }
        })
    )
}

export default strategy;