const express = require('express');

const routes = express.Router();

//
const homeController = require('../controllers/home_controller');
//const { route } = require('./user');
//const router = require('./user');
console.log('router loaded');
routes.get('/', homeController.home);
routes.use('/user', require('./user'));
routes.use('/contact', require('./contact.js'));

routes.use('/posts', require('./posts'));
routes.use('/comments', require('./comment'));
module.exports = routes;