const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboarding-controller.js');
const {loginSchema} = require('../../../validators/login-validator.js');
const {signupSchema} = require('../../../validators/signup-validator.js');
const {validator} = require('../../../middlewares/validate-middleware.js');

router.post('/login',[validator(loginSchema)],onboardingController.login);

router.post('/signup',[validator(signupSchema)],onboardingController.signUp);

module.exports = router;