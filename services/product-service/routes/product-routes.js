const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-CRUD-controller.js');
const { auth } = require('../../../middlewares/auth-middleware.js');
const { restricedTo } = require('../../../middlewares/role-middleware.js');
const { validator } = require('../../../middlewares/validate-middleware.js');
const {createProductSchema} = require('../../../validators/createProduct-validator.js');
const {updateProductSchema} = require('../../../validators/updateProductDetails-validator.js');
const {updateCostSchema} = require('../../../validators/updateProductCost-validator.js');
const {updateQuantitySchema} = require('../../../validators/updateProductQuantity-validator.js');
router.get('/',[auth],productController.getAllProducts);

router.get('/:id',[auth],productController.getProductById);

router.post('/',[validator(createProductSchema),auth,restricedTo('seller')],productController.createProduct);

router.put('/update-product-details/:id',[validator(updateProductSchema),auth,restricedTo('seller')],productController.updateProductDetails);

router.put('/update-product-cost/:id',[validator(updateCostSchema),auth,restricedTo('seller')],productController.updateProductCost);

router.put('/update-product-quantity/:id',[validator(updateQuantitySchema),auth,restricedTo('seller')],productController.updateProductQuantity);

router.delete('/:id',[auth,restricedTo('seller')],productController.deleteProduct);

module.exports = router;