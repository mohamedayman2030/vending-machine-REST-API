const { sequelize } = require('../../../configs/database');
const { Product, User } = require('../../../configs/database.js');


exports.updateInventory = async (productInfo) => {
  return await sequelize.transaction(async (t) => {
    const product = await Product.findByPk(productInfo.id, {
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (!product) {
      const error = new Error("Can't find product with this id");
      error.status = 400;
      throw error;
    }

    product.amountAvailable += productInfo.quantity;

    if (product.amountAvailable < 0) {
      const error = new Error("Amount can't be less than 0");
      error.status = 400;
      throw error;
    }

    await product.save({ transaction: t });
  });
};