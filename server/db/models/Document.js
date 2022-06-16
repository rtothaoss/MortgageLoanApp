const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentsSchema = new Schema({
    length: {
        type: Number
    },
    chunkSize: {
        type: Number
    },
    uploadDate: {
        type: Date
    },
    filename: {
        type: String
    },
    contentType: {
        type: String
    },
    metadata: {
        type: String
    }
})

const DocumentsModel = mongoose.model('documents.files', DocumentsSchema)

module.exports = DocumentsModel;