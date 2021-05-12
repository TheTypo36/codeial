const express = require('express');
const app = express();
const port = 7000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded()); ``
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//for replacing css and script where they belong in the page
app.set("layout extractStyles", true);
app.set("layout extractScript", true);

//use express router

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment 
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }



}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/index.js'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
        return;
    }
    console.log(`The server is up and running on the port: ${port}`);
});