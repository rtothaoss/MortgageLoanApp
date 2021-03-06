const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    loanNumber: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: false
    }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;