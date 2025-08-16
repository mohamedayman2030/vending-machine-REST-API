const Joi = require('joi');

exports.updateCostSchema = Joi.object({
  cost: Joi.number()
    .integer()
    .min(1)
    .required()
});