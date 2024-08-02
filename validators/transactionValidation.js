// validation/transactionValidation.js
const Joi = require('joi');

const createTransactionSchema = Joi.object({
    wallet_id: Joi.string().required().messages({
        'any.required': 'wallet id is required'
    }),
    amount: Joi.number().positive().required().messages({
        'number.base': 'Amount should be a type of "number"',
        'number.positive': 'Amount must be positive',
        'any.required': 'Amount is a required field',
    }),
    transaction_method: Joi.string().valid("income", "expense"),
    purpose: Joi.string().required().messages({
        "any.required": "purpose is required"
    }),
    note: Joi.string().optional()
});

module.exports = {
    createTransactionSchema,
};