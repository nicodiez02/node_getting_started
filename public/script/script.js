import mysql from 'mysql';

const DATABASE = "products"
const HOST = "localhost"
const USER = "root"
const PASSWORD = ""

const connector = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

connector.connect(err => {
    if (err) throw err;
});

export { connector }