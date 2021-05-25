const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            res.redirect('/');
        }
    } catch (err) {
        console.log('Error', err);
        return;
    }

    // Post.findById(req.body.post, function (err, post) {
    //     if (post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function (err, comment) {
    //             if (err) {
    //                 console.log('error in create the comment', err);
    //                 return;
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         });
    //     }
    // });
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id || Post.findById(comment.post, function (err, post) {
            if (post.user == req.user.id) {
                return true;
            } else {
                return false;
            }
        })
        ) {
            let postId = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');

        } else {
            return res.redirect('back');

        }
    } catch (err) {
        console.log('error', err);
    }
    // Comment.findById(req.params.id, function (err, comment) {

    //     if (comment.user == req.user.id || (
    //         Post.findById(comment.post, function (err, post) {
    //             if (post.user == req.user.id) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         })
    //     )) {
    //         let postId = comment.post;
    //         comment.remove();

    //         Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {

    //             return res.redirect('back');
    //         });
    //     } else {
    //         return res.redirect('back');
    //     }

    // });
}