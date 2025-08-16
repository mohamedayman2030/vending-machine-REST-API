const { sequelize, Product, User, Order } = require("../../../configs/database.js");
const {
  validatePurchaseInput,
  checkProductAvailability,
  checkUserBalance,
  createOrderAndUpdateData
} = require('./order-helpers.js');

exports.buyService= async (data) => {
  const t = await sequelize.transaction();

  try {
    validatePurchaseInput(data);

    const product = await checkProductAvailability(data.id, data.productAmount, t);
    const user = await checkUserBalance(data.userID, product.cost * data.productAmount, t);

    const { order, change } = await createOrderAndUpdateData(user, product, data.productAmount, t);

    await t.commit();

    return { change, order };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};
