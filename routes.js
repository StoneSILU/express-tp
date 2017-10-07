var express = require('express');
var controller = require('./controller');
var router = express.Router();

router.get('/', controller.getApp)
router.get('/login', controller.login);
router.get('/search', controller.search);
router.get('/chat', controller.chat);
router.get('/sendmessage', controller.sendMessage);
router.post('/sendEmail', controller.sendEmail);
router.post('/updateInfos', controller.updateInfos)

module.exports = router