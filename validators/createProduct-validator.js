const Joi = require('joi');

exports.createProductSchema = Joi.object({
  productModel: Joi.string().min(1).required(),

  amountAvailable: Joi.number()
    .integer()
    .min(0)
    .required(),

  productName: Joi.string().min(1).required(),

  cost: Joi.number()
    .integer()
    .min(1)
    .required(),

  sellerId: Joi.number()
    .integer()
    .required()
});