const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../db/models/User')
const jwt = require('jsonwebtoken')



router.post('/signup', (req, res, next) => {
    let value ='abc' + (Math.random() * 1000).toFixed(0)
    
    const loanNumber = value
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

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

router.post('/login', (req, res, next) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    const filter = { email : userEmail}

    User.findOne(filter).then(
        (user) => {
            if(!user) return res.status(400).json({msg: 'User does not exist'})
           
    

           const PRIVATE_TOKEN = process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
           

            const jwtBearerToken = jwt.sign({user}, PRIVATE_TOKEN, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: user.loanNumber
            })


            

            bcrypt
            .compare( userPassword, user.password )
            .then(doMatch => {

                if(doMatch) {            
                    
                    // req.session.isLoggedIn = true;
                    // req.session.user = user;
                    return res.status(200).json({idToken: jwtBearerToken, expiresIn: 120, loanNumber: user.loanNumber})
                  }
                  return res.status(401).json({msg: "not logged in"})
            })
        },
   

   
    ).catch(error => next(error));
})

//need admin auth on this to add it 
// router.post('/', (req, res, next) => {
//     console.log(req.body.loanNumber)
//     const user = new User(req.body);
//     user.save().then(
//         (result) => {
//             res.json(result);
//         }
//     ).catch(error => next(error));
// })



module.exports = router;



