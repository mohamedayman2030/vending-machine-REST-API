const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/buy-controller.js');
const { auth } = require('../../../middlewares/auth-middleware.js');
const { restricedTo } = require('../../../middlewares/role-middleware.js');
const { validator } = require('../../../middlewares/validate-middleware.js');
const {buySchema} = require('../../../validators/buy-validator.js');

router.post('/',[validator(buySchema),auth,restricedTo('buyer')],purchaseController.buy);

module.exports = router;