let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let ExpenseModel = require('../../models/Expense');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/addExpense', (req,res) => {

    let expense = new ExpenseModel();
    expense.description = req.body.description;
    expense.amount = req.body.amount;
    expense.month = req.body.month;
    expense.year = req.body.year;

    expense.save(err => {
        if(err) {
            res.send(err);
        }
        res.send(true);
    });
});

router.get('/getExpenseData', (req,res) => {
    ExpenseModel.find({}, (err, expenses) => {
        if(err) {
            res.send(err);
        }
        res.json(expenses);
    });
});

router.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  })

module.exports = router;