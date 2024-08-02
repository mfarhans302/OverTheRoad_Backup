const UserModel = require("../models/user");
const Transaction = require('../models/transaction');
const Wallet = require('../models/wallet');
const { default: mongoose } = require("mongoose");
const makeResponse = require("../lib/response.js")

function transactionWillBeSigned(balance, amount, method) {
    return (method === "expense" && balance - amount < 0);
}

function updateWalletBalance(balance, amount, method) {
    return method === "income" ? balance + amount : balance - amount;
}

const handleTransaction = async (req, res) => {
    try {
        const user = req.user;
        const { wallet_id, transaction_method, amount, note, purpose } = req.body;

        // Checking user existence
        const isUserExisted = await UserModel.findById(user._id);
        if (!isUserExisted) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Check if the user has the associated wallet
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const isWalletAssociatedWithUser = await Wallet.findOne({ owner: user, _id: wallet_id }, null, { session });

            if (!isWalletAssociatedWithUser) {
                await session.abortTransaction();
                return res.status(400).json({ error: `Wallet does not associated with ${user.name}` });
            }

            // Transaction logic with checks within the transaction
            if (transactionWillBeSigned(isWalletAssociatedWithUser.balance, amount, transaction_method)) {
                await session.abortTransaction();
                return res.status(400).json({ error: "Unable to make a transaction. Balance will be negative." });
            }

            // Update wallet balance and create transaction
            isWalletAssociatedWithUser.balance = updateWalletBalance(isWalletAssociatedWithUser.balance, amount, transaction_method);
            const transaction = new Transaction({
                amount,
                date: Date.now(),
                note,
                type: transaction_method,
                wallet: wallet_id,
                purpose,
            });

            await transaction.save({ session });
            isWalletAssociatedWithUser.transactions.push(transaction._id);
            await isWalletAssociatedWithUser.save({ session });

            await session.commitTransaction();
            return res.status(200).json({ message: "Wallet transaction successful." });
        } catch (error) {
            await session.abortTransaction();
            return res.status(200).json({ message: "Unable to perform transaction" });
        } finally {
            await session.endSession();
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    handleTransaction,
};
