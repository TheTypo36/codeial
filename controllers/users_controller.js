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
    })
}