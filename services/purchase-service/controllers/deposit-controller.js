
const { User, sequelize } = require('../../../configs/database.js');
const logger = require('../../../utils/logger.js');
exports.deposit = async (req, res) => {
  let response;

  try {
    await sequelize.transaction(async (t) => {
      const {  deposit } = req.body;

      const id = req.user.id;

      
      if (!id || deposit == null) {
        throw { status: 400, message: "Missing user ID or deposit value" };
      }

      if (![5, 10, 20, 50, 100].includes(deposit)) {
        throw { status: 400, message: "Deposit must be one of 5, 10, 20, 50, or 100" };
      }

      const user = await User.findByPk(id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw { status: 404, message: "User not found" };
      }

      user.deposit = Number(user.deposit) + Number(deposit);
      await user.save({ transaction: t });

      response = {
        status: 'success',
        message: 'Deposit added successfully',
        newBalance: user.deposit,
      };
    });

  
    return res.status(200).json(response);

  } catch (err) {
    
    logger.error('failed to deposit',err);
    return res.status(err.status || 500).json({
      status: 'fail',
      message: err.message || 'Internal server error',
    });
  }
};
