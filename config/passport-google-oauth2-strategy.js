const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use na new strategy for google login
passport.use(new googleStrategy({
    clientID: "271640629293-naecr2oph8jk7g5jebktsn138gbuv7jg.apps.googleusercontent.com",
    clientSecret: "7KJLAHa4rE7u88QFgl44-J6k",
    callbackURL: "http://localhost:7000/user/auth/google/callback",
},
    function (acessTOken, refreshToken, profile, done) {
        //find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (error, user) {
            if (error) {
                console.log("ERROR in google strategy-passport", err);
                return;
            }

            console.log(profile);

            if (user) {
                //if found, set this user as req.user
                return done(null, user);
            } else {
                //if not found, create the user and set is as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passport: crypto.randomBytes.toString('hex')
                }, function (error, user) {
                    if (error) {
                        console.log('ERROR in creating user by passprot', error);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;