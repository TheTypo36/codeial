const { localsName } = require('ejs');
const Post = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes/posts');
const Comment = require('../routes/comment');
const Friendship = require('../models/friendship');
//using async awaiting for handling the chaining of request
module.exports.home = async function (req, res) {
    // res.end("<h1>express is up for codeial</h1>");
    // console.log(req);
    // console.log('hello');
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }



            }).populate('likes');

        let users = await User.find({})
        let friendlist = await User.findOne(req.user)
            .populate({
                path: 'friendships',
                populate: {
                    path: 'to_user'
                }

            });

        console.log(friendlist);
        res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users,
            currUser: friendlist

        });


    } catch (err) {
        console.log('Error', err);
        return;
    }

}