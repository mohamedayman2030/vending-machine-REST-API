const { User,sequelize } = require('../../../configs/database.js');
const logger = require('../../../utils/logger.js');

exports.reset = async (req, res) => {
  try {
    const id = req.user.id;

    await sequelize.transaction(async (t) => {
      const user = await User.findByPk(id, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!user) {
        throw { status: 400, message: "Can't find user with this ID" };
      }

      user.deposit = 0;
      await user.save({ transaction: t });
    });

    return res.status(200).json({
      status: 'success',
      message: 'User deposit reset to 0 successfully',
    });

  } catch (err) {
    logger.error('failed to reset',err);
    return res.status(err.status || 500).json({
      status: 'fail',
      message: err.message || 'Internal server error',
    });
  }
};