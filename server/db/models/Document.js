const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentsSchema = new Schema({
    loanNumber: {
        type: String,
        required: true
    },
    filename: {
        type: String,
    }
})

const DocumentsModel = mongoose.model('documents', DocumentsSchema)

module.exports = DocumentsModel;