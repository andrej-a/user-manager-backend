import mysql from 'mysql';

const connection: mysql.Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2604198siX',
    database: 'users'
})

connection.connect(async (err) => {
    if (err) {
        console.log(`Error with ${err}`);
    } else {
        console.log(`Success connection!`);
        
    }
})

export default connection;