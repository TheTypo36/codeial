//importing passport
const passport = require('passport');

//require the local strategy from passport
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},

    function (req, email, password, done) {
        //find the user and establish the identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error', err);
                return done(err);
            }
            if (!user || user.password != password) {
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);

        });
    }


));

// serializing the user to decide which key is to be kept in th cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user --> passport');
            return;

        }
        return done(null, user);
    });
});
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    //if the user is ont signed in
    return res.redirect('/user/sign-in');
}
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;