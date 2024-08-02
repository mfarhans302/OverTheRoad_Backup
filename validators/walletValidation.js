// validation/walletValidation.js
const Joi = require('joi');


const createWallet = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "wallet name is required"
    })
});

const addFundsSchema = Joi.object({
    amount: Joi.number().positive().required().messages({
        'number.base': 'Amount should be a type of "number"',
        'number.positive': 'Amount must be positive',
        'any.required': 'Amount is a required field'
    }),
});


module.exports = {
    addFundsSchema,
    createWallet
};