const express = require('express');
const router = express.Router()
const UserController = require('../Controllers/UserController');
const BookController = require('../Controllers/BookController');
const CheckUserAuth = require('../middleware/auth');


//UserController
router.post('/register',UserController.register);
router.post('/login',UserController.login);





module.exports = router