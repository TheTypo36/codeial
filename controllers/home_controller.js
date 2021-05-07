module.exports.home = function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    // console.log(req.cookies);
    //res.cookie('user_id', 25);
    res.render('home', {
        title: "home"
    });
}