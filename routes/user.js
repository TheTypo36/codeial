const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get("/profile/:id", passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {
        failureRedirect: '/user/sign-in'

    },
), userController.createSession);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/sign-in' }), userController.createSession);

router.get('/sign-out', userController.destroySession);

//route for page when we enter email for searching the email in the database
router.get('/forgot-password', userController.forgotten);


//routes that find the email and send the link to the email to resetting password
router.get('/recover', userController.recoverEmail);

//route that open the page for when newpassword is enter
router.get('/reset-password', userController.resetPassword);


//action when new password and confirm password is entered
router.post('/reset-password', userController.changePassword);

router.post('/friendship', userController.friendShip);

router.post('/friendship_destroy', userController.friendshipDestroy);
module.exports = router;