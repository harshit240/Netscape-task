const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  published_at: {
    type: String,
    required: true,
  },
  copies: {
    type: String,
    required: true,
  },
}, { timestamps: true });

var bookModel = mongoose.model("Book", bookSchema);
module.exports = bookModel;
