const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get("/profile", userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.post('/sign-out', userController.signOut);
module.exports = router;