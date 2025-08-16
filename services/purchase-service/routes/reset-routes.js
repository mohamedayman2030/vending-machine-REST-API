const express = require('express');
const router = express.Router();
const resetController = require('../controllers/reset-controller.js');
const { auth } = require('../../../middlewares/auth-middleware.js');
const { restricedTo } = require('../../../middlewares/role-middleware.js');

router.post('/',[auth,restricedTo('buyer')],resetController.reset);

module.exports = router;