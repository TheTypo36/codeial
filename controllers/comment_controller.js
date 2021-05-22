const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log('error in create the comment', err);
                    return;
                }
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {

        if (comment.user == req.user.id || (
            Post.findById(comment.post, function (err, post) {
                if (post.user == req.user.id) {
                    return true;
                } else {
                    return false;
                }
            })
        )) {
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {

                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }

    });
}