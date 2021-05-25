const { localsName } = require('ejs');
const Post = require('../models/post');
const user = require('../models/user');

//using async awaiting for handling the chaining of request
module.exports.home = async function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    // console.log(req);
    // console.log('hello');
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await user.find({});

        res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });


    } catch (err) {
        console.log('Error', err);
        return;
    }

}