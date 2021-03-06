const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const path = require('path');
//code for setup for socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets.js').chatSockets(chatServer);
chatServer.listen(5000);
console.log('socket.io is running on the port number 5000');


const customMware = require('./config/middleware');
const env = require('./config/environment.js');
//const multer = require('multer');


app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded()); ``
app.use(cookieParser());
app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
//for replacing css and script where they belong in the page
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//use express router

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment 
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disable'
        },
        function (err) {
            console.log(err || 'connect-mongo setup is okay');
        }

    )



}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
        return;
    }
    console.log(`The server is up and running on the port: ${port}`);
});