const Joi = require('joi');

// Define Joi validation schema for CompanyInfo
const companyInfoSchema = Joi.object({
    EIN: Joi.number().required(),
    Authority: Joi.number().required(),
    authorityFile: Joi.string().uri().required(),
    Bradstreet: Joi.number().required(),
    MC: Joi.number().required(),
    mcFile: Joi.string().uri().required(),
    DOT: Joi.number().required(),
    dotFile: Joi.string().uri().required(),
    Resume: Joi.string().uri().required(),
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    fileLink: Joi.string().uri().required()
});

module.exports = companyInfoSchema;
