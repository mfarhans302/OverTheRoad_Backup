const express = require('express');
const walletRouter = express.Router();
const walletController = require('../controllers/walletController');
const validate = require('../middlewares/validate');
const { verifyAccessToken } = require("../middlewares/auth.js");
const {
    addFundsSchema,
    createWallet,
} = require('../validators/walletValidation');

walletRouter.post('/wallet', verifyAccessToken, validate(createWallet), walletController.createWallet);
walletRouter.get('/wallet/:id', verifyAccessToken, walletController.getWalletBalance);
walletRouter.get('/wallets', verifyAccessToken, walletController.getAllMyWallets);
walletRouter.put('/wallet/add-funds/:wallet_id', verifyAccessToken, validate(addFundsSchema), walletController.addFunds);

module.exports = walletRouter;
