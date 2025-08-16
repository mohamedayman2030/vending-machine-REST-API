const Joi = require('joi');

exports.depositSchema = Joi.object({
  deposit: Joi.number()
    .valid(5, 10, 20, 50, 100)
    .required()
});