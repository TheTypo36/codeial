module.exports.ImgPost = function (req, res) {
    console.log(req.body);
    res.end('<h1>req.body.content </h1>');
}
module.exports.videoPost = function (req, res) {
    res.end('<h1>This is video of 1 post</h1>');
}