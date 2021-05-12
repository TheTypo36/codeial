const User = require('../models/user')
module.exports.profile = function (req, res) {
    res.render('user_profile', {
        title: "User_profile"
    });
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
    return res.redirect('/');
}