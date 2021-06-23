const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


//comment in function is normal code and code in async await code
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {

            return res.status(200).json({
                data: {
                    post: post,
                    username: req.user.name
                },
                message: 'Post created!!'
            });
        }
        req.flash('success', 'post created');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');

    }
    // Post.create({
    //     content: req.body.content,
    //     user: req.user._id
    // }, function (err, post) {
    //     if (err) {
    //         console.log("error in posting", err);
    //         return;
    //     }
    //     return res.redirect('back');
    // });
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {

            await Like.deleteMany({ likeable: post._id, onMondel: 'Post' });
            await Like.deleteMany({ _id: { $in: post.Comment } });
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post: req.params.id
                    },
                    message: 'post deleted'
                });
            }
            req.flash('success', 'post and associated comment is deleted');
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }


    }
    catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
    // Post.findById(req.params.id, function (err, post) {

    //     //.id converts the object id into string
    //     if (post.user == req.user.id) {
    //         post.remove();

    //         Comment.deleteMany({ post: req.params.id }, function (err) {
    //             return res.redirect('back');
    //         });
    //     } else {
    //         return res.redirect('back');
    //     }
    // });
}