let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
  _id: String,
  description: String,
  amount: Number,
  month: String,
  year: Number
});

module.exports = mongoose.model('ExpenseModel', ExpenseSchema);
