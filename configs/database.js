const { Sequelize } = require('@sequelize/core');

const { PostgresDialect } = require('@sequelize/postgres');

const {DataTypes} = require('@sequelize/core');

const dotenv = require('dotenv');


dotenv.config();

const {POSTGRES_HOST,POSTGRES_DB,POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_PORT} = process.env;

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: POSTGRES_DB,
    user:POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
});

const User = require('../services/user-service/models/user-model')(sequelize,DataTypes);
const Product = require('../services/product-service/models/product-model')(sequelize,DataTypes);
const Order = require('../services/purchase-service/models/order-model')(sequelize,DataTypes);

const models = {
    User,
    Product,
    Order,
    sequelize
}

Object.values(models).forEach((model)=>{
    model.associate?.(models);
})

module.exports = models;