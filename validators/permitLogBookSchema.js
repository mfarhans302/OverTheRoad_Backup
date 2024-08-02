const Joi = require('joi');

const permitLogBookSchema = Joi.object({
    Collicence: Joi.string().uri().required(),
    MedicalCard: Joi.string().uri().required(),
    Insurance: Joi.string().uri().required(),
    IFTAregistration: Joi.string().uri().required(),
    TwicCard: Joi.string().uri().required(),
    CabCard: Joi.string().uri().required(),
    AuthorityLetter: Joi.string().uri().required(),
    UCR: Joi.string().uri().required(),
    EmptyScaleTicket: Joi.string().uri().required(),
    TruckInspection: Joi.string().uri().required(),
    SelectYourState: Joi.array().items(Joi.string()).required(),
    title: Joi.string().required(),
    description: Joi.string().required()
});

module.exports = permitLogBookSchema;
