const mongoose = require('mongoose');

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD

const uri = `mongodb+srv://${username}:${password}@cluster0.vc0io.mongodb.net/MortgageLoanApp?retryWrites=true&w=majority`

mongoose.connect(uri, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Successfully connected to MongoDB')
});

module.exports = mongoose;