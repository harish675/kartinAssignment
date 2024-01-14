const express = require('express');
const  router =  express.Router();
const userController = require('../controller/user_controller');
const passport = require('passport');

router.post('/create',userController.createUser);
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect :'back'},
),userController.createSession);

router.get('/profile',userController.profilePage);
router.post('/:id/schedule',userController.scheduleReminder);
router.get('/:id/reminders', userController.getReminders);


module.exports = router;