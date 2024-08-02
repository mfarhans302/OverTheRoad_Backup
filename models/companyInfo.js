const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
    EIN: {
        type: Number,
        required: true
    },
    Authority: {
        type: Number,
        required: true
    },
    authorityFile: {
        type: String,
        required: true
    },
    Bradstreet: {
        type: Number,
        required: true
    },
    MC: {
        type: Number,
        required: true
    },
    mcFile: {
        type: String,
        required: true
    },
    DOT: {
        type: Number,
        required: true
    },
    dotFile: {
        type: String,
        required: true
    },
    Resume: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    fileLink: {
        type: String,
        required: true
    }
});

const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);

module.exports = CompanyInfo;
