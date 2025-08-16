const Joi = require('joi');

exports.updateProductSchema = Joi.object({
  productModel: Joi.string().min(1).optional(),
  productName: Joi.string().min(1).optional(),
  sellerId: Joi.number().integer().optional()
});