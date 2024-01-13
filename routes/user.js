const express = require('express');
const  router =  express.Router();
const userController = require('../controller/user_controller');

router.post('/create',userController.createUser);


module.exports = router;