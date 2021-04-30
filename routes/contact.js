const express = require('express');

const router = express.Router();


const contactController = require("../controllers/contact_controller.js")
router.get('/phone', contactController.phone);
router.get('/address', contactController.address);
module.exports = router;