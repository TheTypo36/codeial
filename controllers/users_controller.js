const User = require('../models/user');
const resetPasswordToken = require('../models/resetPassword');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const resetPasswordMailer = require('../mailers/resetPassword');
module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {

        res.render('user_profile', {
            title: "User profile",
            profile_user: user
        });
    });
}
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {

        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('error:', err);
                    return;
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {

                    //check for removing already exits avatar, if any
                    if (user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        } catch (error) {
            req.flash('error', err);
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unathorized');
    }
    // if (req.user.id = req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorized');
    // }
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    res.render('user_signup.ejs', {
        title: "codeial | Sign Up"
    });
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    res.render('user_signin', {
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
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have been Logged Out');
    return res.redirect('/');

}

//rendering the page for find account
module.exports.forgotten = function (req, res) {
    res.render('forgottenPassword.ejs', {
        title: "Finding Id"
    });
}


//sending mail for resetting password
module.exports.recoverEmail = function (req, res) {

    User.findOne({ email: req.query.email }, function (err, user) {
        if (err) {
            console.log('error in find the email id: ', err);
            return;
        }
        console.log(user);
        //creating resetPassword token
        resetPasswordToken.create({
            user: user,
            accessToken: crypto.randomBytes(20).toString('hex'),
            isValid: true

        }, function (error, resetPasswordToken) {

            resetPasswordMailer.resetPassword(resetPasswordToken);
        });
        res.redirect('back');
    })
}

//rendering page for resetting password if the tokens is valid
module.exports.resetPassword = function (req, res) {
    resetPasswordToken.findOne({ accessToken: req.query.accessToken }, function (error, resetPasswordToken) {
        if (error) {
            console.log('ERROR in find token', error);
            return;
        }
        res.render('resetPassword.ejs', {
            title: "Reset Password",
            resetPasswordToken: resetPasswordToken
        });
    });

}

// action for resetting password 
module.exports.changePassword = function (req, res) {
    if (req.body.newPass != req.body.confPass) {
        console.log('passwords didn\'t  match');
        return res.redirect('back');
    }

    // resetPasswordToken.findOne({accessToken: req.query.accessToken},function(err,resetPasswordToken){
    //     if (error) {
    //         console.log('ERROR in find token', error);
    //         return;
    //     }
    //     resetPasswordToken.isValid = false;

    //     resetPasswordToken.update( $set{user.password: req.body.newPass})
    // })

    resetPasswordToken.findOne({ accessToken: req.query.accessToken }).populate('user', 'password').exec(function (error, resetPasswordToken) {
        if (error) {
            console.log('ERROR in find token', error);
            return;
        }

        resetPasswordToken.isValid = false;
        resetPasswordToken.user.password = req.body.newPass;
        resetPasswordToken.save();
        console.log(resetPasswordToken);
    });


    return res.redirect('/user/sign-in');
}