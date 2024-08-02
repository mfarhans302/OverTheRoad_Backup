const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    note: {
        type: String,
    },
    purpose: {
        type: String,
        required: true,
        default: "others"
    }
});

module.exports = mongoose.model('transaction', TransactionSchema);