const express = require('express');
const router = express.Router();
const Mortgage = require('../db/models/Mortgage');
const authorize = require('../middlewares/auth')

router.get('/', (req, res, next) => {
    Mortgage.find().then(
        (product) => {
            console.log(product)
            res.json(product);
        }
    ).catch(error => next(error));
})

//need admin auth on this to add it 
router.post('/', (req, res, next) => {
    console.log(req.body.loanNumber)
    const mortgage = new Mortgage(req.body);
    mortgage.save().then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
})

router.get('/:loanNumber', authorize, (req, res, next) => {
    const filter = { loanNumber : req.params.loanNumber }
    Mortgage.find(filter).then(
        (result) => {
            res.json(result)
        }
    ).catch(error => next(error))
})

//updating either totalMonthly or remainingLoan
router.put('/:loanNumber', (req, res, next) => {
    const filter = { loanNumber : req.params.loanNumber }
    let update = {};


    if(req.body.totalMonthlyPayment) {
        update["totalMonthlyPayment"] = req.body.totalMonthlyPayment;
    }

    if(req.body.remainingLoanBalance) {
        update["remainingLoanBalance"] = req.body.remainingLoanBalance;
    }

    console.log(filter)
    console.log(update)
    Mortgage.findOneAndUpdate(filter, update, { new: true }).then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
});


module.exports = router;