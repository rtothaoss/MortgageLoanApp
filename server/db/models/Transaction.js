const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    loanNumber: {
        type: String,
       
    },
    dateReceived: {
        type: String
    },
    totalAmountReceived: {
        type: String
    },
    principal: {
        type: String,
       
    },
    interest: {
        type: String,
        
    },
    pmi: {
        type: String
    },
    escrow: {
        type: String
    },
    fees: {
        type: String
    }
})

const TransactionModel = mongoose.model('transaction', TransactionSchema)

module.exports = TransactionModel;