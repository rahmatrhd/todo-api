const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const userController = require('../controllers/userController')

router.get('/', userController.setFBAccessToken, userController.getUser)
router.post('/login', userController.setFBAccessToken, userController.login)

module.exports = router
