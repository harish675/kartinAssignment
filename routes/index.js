
const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');


router.use('/user',require('./user'));
router.get('/',homeController.homePage);



module.exports = router;