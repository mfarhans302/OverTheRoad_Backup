const mongoose = require('mongoose');

const permitLogBookSchema = new mongoose.Schema({
    Collicence: {
        type: String,
        required: true
    },
    MedicalCard: {
        type: String,
        required: true
    },
    Insurance: {
        type: String,
        required: true
    },
    IFTAregistration: {
        type: String,
        required: true
    },
    TwicCard: {
        type: String,
        required: true
    },
    CabCard: {
        type: String,
        required: true
    },
    AuthorityLetter: {
        type: String,
        required: true
    },
    UCR: {
        type: String,
        required: true
    },
    EmptyScaleTicket: {
        type: String,
        required: true
    },
    TruckInspection: {
        type: String,
        required: true
    },
    SelectYourState: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const PermitLogBook = mongoose.model('PermitLogBook', permitLogBookSchema);

module.exports = PermitLogBook;
