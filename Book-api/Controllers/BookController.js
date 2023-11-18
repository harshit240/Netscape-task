const bookModel = require('../models/Book');
const checkoutModel = require('../models/Checkouts');

class BooController {

  static getAllBooks = async (req, res) => {
    try {
      const Posts = await bookModel.find();
      res.status(200).json({
        success: true,
        Posts,
      });
    } catch (error) {
      console.log(err);
    }
  };

  static createBook = async (req, res) => {
    // console.log(req.body);
    try {
      const addBook = await bookModel.create({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        published_at: req.body.published_at,
        copies: req.body.copies,
      });
      await addBook.save();
      res.status(201).send({
        status: "success",
        message: "Book Added Successfully 😃🍻",
        addBook
      });
    } catch (error) {
      console.log(error);
    }
  };

  static updateBook = async (req, res) => {
    try {
      const result = await bookModel.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).send({
        status: "success",
        message: "Book updated Successfully 😃🍻",
      });
      await result.save()
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const result = await bookModel.findByIdAndDelete(req.params.id)
      res.status(200).send({
        status: "success",
        message: "Book deleted Successfully 😃🍻",
      });
      await result.save()
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  };

  static checkoutBook = async (req, res) => {
    try {
      const user = req.data1
      console.log("user => ", user)

      const book = await bookModel.findById(req.params.id);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      if (book.copies === 0) {
        return res.status(400).json({ error: 'No available copies of the book' });
      }
      const checkout = await checkoutModel.create({
        user_id: user._id,
        book_id: req.params.id,
      });
      book.copies--;

      await book.save();
      await checkout.save();

      res.json({ message: 'Book checked out successfully', checkedOutBook: book });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }


  }

  static returnBook = async (req, res) => {
    try {
      const checkoutId = req.params.id;

      const checkout = await checkoutModel.findOne({book_id:checkoutId});

      if (!checkout) {
        return res.status(404).json({ error: 'Checkout entry not found' });
      }

      if (checkout.returned) {
        return res.status(400).json({ error: 'Book already returned' });
      }

      checkout.returned = true;

      await checkout.save();

      const book = await bookModel.findById(checkout.book_id);
      book.copies++;

      await book.save();

      res.json({ message: 'Book marked as returned successfully', returnedBook: book });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = BooController;
