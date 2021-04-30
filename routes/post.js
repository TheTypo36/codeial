const express = require('express');

const router = express.Router();

const postController = require('../controllers/post_controller');
router.get('/img', postController.ImgPost);
router.get('/video', postController.videoPost);
module.exports = router;