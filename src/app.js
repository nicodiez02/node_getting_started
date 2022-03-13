import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import bodyParser from 'body-parser';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { router } from './routes/Router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = "3001";

var options =
{
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
}

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})

app.use((req, res, next) => 
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.static(path.join(__dirname, '../public')));
app.use(session(
    {
        key: 'session_info',
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

app.engine('hbs', engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));