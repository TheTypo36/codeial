const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');

module.exports.toggleLikes = async function (req, res) {
    try {
        let likeable;
        let deleted = false;

        if (req.query.type == "Post") {
            likeable = await Post.findById(req.query.id).populate('likes');
        } else {
            likeable = await Comment.findById(req.query.id).populate('likes');

        }

        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type

        });

        if (existingLike) {
            likeable.likes.pull(existingLike.id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        } else {
            let newlike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newlike._id);
        }
        return res.json(200, {
            message: "request succesfull",
            data: deleted
        });
    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}