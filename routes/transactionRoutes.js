
const express = require('express');
const router = express.Router();
const { handleTransaction } = require('../controllers/transactionController');
const validate = require('../middlewares/validate');
const { createTransactionSchema } = require('../validators/transactionValidation.js');
const { verifyAccessToken } = require("../middlewares/auth.js")

router.post('/transaction', verifyAccessToken, validate(createTransactionSchema), handleTransaction);

module.exports = router;