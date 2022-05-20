const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MortgageSchema = new Schema({
    LoanNumber: {
        type: String,
        required: true
    },
    loanTotalAmount: {
        type: String,
    },
    totalMonthlyPayment: {
        type: String,
    },
    remainingLoanBalance: {
        type: String
    }
})

const MortgageModel = mongoose.model('mortgage', MortgageSchema)

module.exports = MortgageModel;