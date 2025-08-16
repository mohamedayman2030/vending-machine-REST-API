const express = require('express');
const router = express.Router();
const depositController = require('../controllers/deposit-controller.js');
const { auth } = require('../../../middlewares/auth-middleware.js');
const { restricedTo } = require('../../../middlewares/role-middleware.js');
const { validator } = require('../../../middlewares/validate-middleware.js');
const {depositSchema} = require('../../../validators/deposit-validator.js');
router.post('/',[validator(depositSchema),auth,restricedTo('buyer')],depositController.deposit);

module.exports = router;