module.exports.index = function (req, res) {
    return res.json(200, {
        message: 'list of posts for version 2',
        posts: []
    });
}