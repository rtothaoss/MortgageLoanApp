const express = require('express');
const router = express.Router();
const Transaction = require('../db/models/Transaction')
const authorize = require('../middlewares/auth')



router.get('/', (req, res, next) => {
    Transaction.find().then(
        (product) => {
            console.log(product)
            res.json(product);
        }
    ).catch(error => next(error));
})

router.get('/:loanNumber', authorize, (req, res, next) => {
    const filter = { loanNumber: req.params.loanNumber }
    Transaction.find(filter).then(
        (result) => {
            res.json(result)
        }
    ).catch(error => next(error))
})

//need admin auth on this to add it 
router.post('/', (req, res, next) => {
    console.log(req.body.loanNumber)
    const transaction = new Transaction(req.body);
    transaction.save().then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
})

module.exports = router;