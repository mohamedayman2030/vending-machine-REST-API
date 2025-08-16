const Joi = require('joi');

exports.signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  
  password: Joi.string().min(6).required(),
  
  role: Joi.string().valid('seller', 'buyer').required()
});