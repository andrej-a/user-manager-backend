import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import route from '../settings/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

app.listen(PORT, () => {
    console.log(`App is listening port ${PORT}`);
});