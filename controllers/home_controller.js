module.exports.home = function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    res.render('home', {
        title: "home"
    });
}