let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ExpenseSchema = new Schema({
  description: String,
  amount: Number,
  month: String,
  year: Number
});

module.exports = mongoose.model('ExpenseModel', ExpenseSchema);
