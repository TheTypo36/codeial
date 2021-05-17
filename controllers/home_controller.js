const { localsName } = require('ejs');
const Post = require('../models/post');
module.exports.home = function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    // console.log(req);
    // console.log('hello');

    Post.find({}).populate('user').exec(
        function (err, posts) {
            res.render('home', {
                title: "Codeial | Home",
                posts: posts
            });
        }
    );

}