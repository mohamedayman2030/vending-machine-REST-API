const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-CRUD-controller.js');
const { auth } = require('../../../middlewares/auth-middleware.js');
const {validator} = require('../../../middlewares/validate-middleware.js');
const {updateUserSchema} = require('../../../validators/updateUser-validator.js');



router.get('/',[auth],userController.getAllUsers);

router.get('/:id',[auth],userController.getUserById);

router.put('/:id',[validator(updateUserSchema),auth],userController.updateUser);

router.delete('/:id',[auth],userController.deleteUser);


module.exports = router;