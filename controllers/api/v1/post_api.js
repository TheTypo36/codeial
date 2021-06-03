const Post = require('../../../models/post')
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },



        });

    return res.json(200, {
        message: "Lists of Posts",
        post: posts
    });
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        // if (post.user == req.user.id) {
        post.remove();
        await Comment.deleteMany({ post: req.params.id });
        return res.json(200, {
            message: "post and associated comments deleted successfully"
        });
        // if (req.xhr) {
        //     return res.status(200).json({
        //         data: {
        //             post: req.params.id
        //         },
        //         message: 'post deleted'
        //     });
        // }
        // req.flash('success', 'post and associated comment is deleted');
        // return res.redirect('back');
        // } else {
        //     return res.redirect('back');
        // }


    }
    catch (err) {
        // req.flash('error', err);
        // return res.redirect('back');
        console.log('***********ERR***', err);
        return res.json(500, {
            message: 'interal server error'
        });
    }
}