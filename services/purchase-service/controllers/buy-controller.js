const { sequelize, Product, User, Order } = require("../../../configs/database.js");
const logger = require('../../../utils/logger.js');


exports.buy = async (req, res) => {
  let response; 

  try {
    await sequelize.transaction(async (t) => {
      const product = await Product.findByPk(req.body.id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      const availableQuantity = product.amountAvailable;
      if (availableQuantity < req.body.productAmount) {
        throw { status: 400, message: 'Not enough quantity' };
      }

      const user = await User.findByPk(req.body.userID, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw { status: 404, message: "User not found" };
      }

      const availableBalance = user.deposit;
      const productPrice = product.cost;
      const totalCost = req.body.productAmount * productPrice;

      if (availableBalance < totalCost) {
        throw { status: 400, message: 'Not enough balance' };
      }

      
      product.amountAvailable = availableQuantity - req.body.productAmount;
      await product.save({ transaction: t });

   
      const order = await Order.create({
        productId: product.id,
        userId: user.id,
        quantityPurchased: req.body.productAmount,
        totalCost: totalCost,
      }, { transaction: t });

      
      user.deposit = 0;
      await user.save({ transaction: t });

     
      const change = availableBalance - totalCost;

      
      response = {
        status: 'success',
        message: 'Order proceeded successfully',
        change,
        order,
      };
    });

    
    return res.status(200).json(response);

  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
   logger.error('failed to purchase',err);
    return res.status(status).json({
      status: 'fail',
      message,
    });
  }
};