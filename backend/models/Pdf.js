const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PdfSchema = new Schema({
    sourceId: {
        type: String,
        required: true,
        unique: false,
    },
    userId: {
        type: String,
        required: true,
        unique: false, 
    },
    name: {
        type: String,
        required: true,
        unique: false, 
    }
}, { timestamps: true });


const Pdf = mongoose.model('Pdf', PdfSchema);

module.exports = Pdf;