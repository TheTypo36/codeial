const User = require('../models/user')
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