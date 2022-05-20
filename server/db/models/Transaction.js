const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    LoanNumber: {
        type: String,
       
    },
    DateReceived: {
        type: String
    },
    TotalAmountReceived: {
        type: String
    },
    Principal: {
        type: String,
       
    },
    Interest: {
        type: String,
        
    },
    PMI: {
        type: String
    },
    Escrow: {
        type: String
    },
    Fees: {
        type: String
    }
})

const TransactionModel = mongoose.model('transaction', TransactionSchema)

module.exports = TransactionModel;