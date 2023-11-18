const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  book_id: {
    type: String,
  },
  checkout_date: {
    type: String,
  },
  return_date: {
    type: Boolean,
  },
}, { timestamps: true });

var checkoutModel = mongoose.model("Checkout", checkoutSchema);
module.exports = checkoutModel;
