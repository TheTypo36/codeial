const User = require('../models/user')
const cookieParser = require('cookie-parser');
module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (err) {
                console.log('err', err);
                return;
            }
            if (user) {
                return res.render('user_profile.ejs', {
                    title: "user_profile",
                    user: user
                });
            } else {

                return res.redirect('/user/sign-in');
            }
        });
    } else {
        return res.redirect('/user/sign-in');
    }
    // res.render('user_profile', {
    //     title: "User_profile"
    // });
}

module.exports.signUp = function (req, res) {
    res.render('user_signup.ejs', {
        title: "codeial | Sign Up"
    });
}

module.exports.signIn = function (req, res) {
    res.render('user_signin.ejs', {
        title: "codeail | Sign In"
    });
}

module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in find the error: ', err);
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in creating user while sign in: ', err);
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        } else {
            return res.redirect('back');
        }


    });
}
module.exports.createSession = function (req, res) {
    //todo later
    //find the user

    //check if the user exits

    //if exits


    //if not    

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in find the user while signing in');
            return;
        }
        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        } else {
            return res.redirect('back');
        }
    });

}
module.exports.signOut = function (req, res) {
    if (req.cookies.user_id) {
        console.log(req.cookies.user_id);
        res.cookie('user_id', 11);
        return res.redirect('/user/sign-in');
    }
}