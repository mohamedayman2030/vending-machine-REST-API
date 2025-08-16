const Joi = require('joi');

exports.buySchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required(), // Product ID

  userID: Joi.number()
    .integer()
    .positive()
    .required(),

  productAmount: Joi.number()
    .integer()
    .min(1)
    .required()
});