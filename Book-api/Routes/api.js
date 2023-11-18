const express = require('express');
const router = express.Router()
const UserController = require('../Controllers/UserController');
const BookController = require('../Controllers/BookController');
const CheckUserAuth = require('../middleware/auth');


//UserController
router.post('/register',UserController.register);
router.post('/login',UserController.login);


//BookController
//GET
router.get('/books',CheckUserAuth,BookController.getAllBooks);
//POST
router.post('/books',CheckUserAuth,BookController.createBook);
//Update(Put)
router.put('/books/:id',CheckUserAuth,BookController.updateBook);
// Delete
router.delete('/books/:id',CheckUserAuth,BookController.deleteBook);

//Checkout Book
router.post('/checkouts/:id',CheckUserAuth,BookController.checkoutBook);

router.put('/checkouts/:id',CheckUserAuth,BookController.returnBook);




module.exports = router