const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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

router.post('/signup', (req, res, next) => {
    let value = Math.random() * 1000

    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const loanNumber = value.toFixed(0)

    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            loanNumber: loanNumber,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        })
        user.save().then(
            (result) => {
                res.json(result);
            }
        ).catch(error => next(error));
    })
})

module.exports = router;