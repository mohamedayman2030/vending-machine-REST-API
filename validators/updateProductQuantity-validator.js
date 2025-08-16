const Joi = require('joi');

exports.updateQuantitySchema = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(0)
    .required()
});