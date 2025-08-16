const express = require('express');
const app = express();

const productRoutes = require('./services/product-service/routes/product-routes.js');
const userRoutes = require('./services/user-service/routes/user-routes.js');
const onboardingRoutes = require('./services/user-service/routes/onboarding-routes.js');
const purchaseRoutes = require('./services/purchase-service/routes/purchase-routes.js');
const depositRoutes = require('./services/purchase-service/routes/deposit-routes.js');
const resetRoutes = require('./services/purchase-service/routes/reset-routes.js');


app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/orders', purchaseRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/reset', resetRoutes);


module.exports = app;
