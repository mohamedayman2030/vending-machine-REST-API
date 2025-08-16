const Joi = require('joi');

exports.updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
  role: Joi.string().valid('seller', 'buyer').optional()
});