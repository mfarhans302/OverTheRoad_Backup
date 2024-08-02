// controllers/walletController.js
const Wallet = require('../models/wallet.js');

// Create a new wallet
const createWallet = async (req, res) => {
    try {
        const wallet_name = req.body.name
        const owner = req.user;
        const wallet = new Wallet({ owner, name: wallet_name });
        await wallet.save();
        res.status(201).json(wallet);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get wallet balance
const getWalletBalance = async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id).populate("transactions")
        if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
        res.json({ balance: wallet });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Add funds to wallet
const addFunds = async (req, res) => {
    try {

        const wallet_id = req.params.wallet_id
        let { amount } = req.body;
        amount = parseInt(amount)
        const wallet = await Wallet.findOne({ owner: req.user, _id: wallet_id });
        if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
        wallet.balance += amount;
        await wallet.save();
        res.json(wallet);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// get my all wallets 
const getAllMyWallets = async (req, res) => {
    try {
        const user = req.user;
        const wallets = await Wallet.find({ owner: user })
        return res.status(200).json(wallets)
    } catch (error) {
        return res.status(500).json({ error: "Failed to get wallets" })

    }
}
module.exports = {
    createWallet,
    getWalletBalance,
    addFunds,
    getAllMyWallets
};