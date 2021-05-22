const { localsName } = require('ejs');
const Post = require('../models/post');
const user = require('../models/user');
module.exports.home = function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    // console.log(req);
    // console.log('hello');

    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            user.find({}, function (err, users) {

                res.render('home', {
                    title: "Codeial | Home",
                    posts: posts,
                    all_users: users
                });
            });
        }
        );

}