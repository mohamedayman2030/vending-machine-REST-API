const { sequelize, Product, User, Order } = require("../../../configs/database.js");

exports.validatePurchaseInput = (data) => {
    const { id, userID, productAmount } = data;
    if (!id || !userID || !productAmount || productAmount <= 0) {
      throw { status: 400, message: 'Invalid input data' };
    }
  };
  
  exports.checkProductAvailability = async (productId, quantity, t) => {
    const product = await Product.findByPk(productId, { transaction: t, lock: t.LOCK.UPDATE });
    if (!product) throw { status: 404, message: 'Product not found' };
    if (product.amountAvailable < quantity) {
      throw { status: 400, message: 'Not enough quantity available' };
    }
    return product;
  };
  
  exports.checkUserBalance = async (userId, cost, t) => {
    const user = await User.findByPk(userId, { transaction: t, lock: t.LOCK.UPDATE });
    if (!user) throw { status: 404, message: 'User not found' };
    if (user.deposit < cost) throw { status: 400, message: 'Not enough deposit' };
    return user;
  };
  
  exports.createOrderAndUpdateData = async (user, product, quantity, t) => {
    const totalCost = product.cost * quantity;
    const change = user.deposit - totalCost;
  
    product.amountAvailable -= quantity;
    user.deposit = 0;
  
    await product.save({ transaction: t });
    await user.save({ transaction: t });
  
    const order = await Order.create({
      productId: product.id,
      userId: user.id,
      quantityPurchased: quantity,
      totalCost
    }, { transaction: t });
  
    return { order, change };
  };