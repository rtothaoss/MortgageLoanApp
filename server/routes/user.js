const express = require('express');
const router = express.Router();
const User = require('../db/models/User')

router.get('/', (req, res, next) => {
    User.find().then(
        (product) => {
            console.log(product)
            res.json(product);
        }
    ).catch(error => next(error));
})

//need admin auth on this to add it 
router.post('/', (req, res, next) => {
    console.log(req.body.loanNumber)
    const user = new User(req.body);
    user.save().then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
})

module.exports = router;