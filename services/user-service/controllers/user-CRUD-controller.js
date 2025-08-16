const bcrypt = require('bcrypt');
const {User} = require('../../../configs/database.js');
const {hashedPassword} = require('../helpers/authHelpers.js');
const logger = require('../../../utils/logger.js');

exports.createUser = async (userDetails) => {
    try {
      const {username, password, role} = userDetails;
      const isExist = await User.findOne({where:{username:username}});
      if(isExist){
        return {
            status: 'EXIST',
            message: 'user exists'
        }
      }
      const hashedPass = await hashedPassword(password);
      const user = await User.create({
        username,
        role,
        password: hashedPass
      });
      return {
        status: 'SUCCESS',
        message: user

    }
    } catch (err) {
      logger.error('Failed to get user', err);
        throw err;
    }
  };


  exports.getUserById = async (req, res) => {
    try{
    const user = await User.findByPk(req.params.id);
    if (user){ 
      logger.info('User returned', user);
      res.json(user);
    }
    else res.status(404).json({ error: 'User not found' });
    }catch(err){
      logger.error('Failed to get user', err);
      return res.status(500).json({
        status:'fail',
        message: 'cannot get user'
      })
    }
  };

  exports.getAllUsers = async (req, res) => {
    try{
    const users = await User.findAll();
    return res.status(200).json(users);
    }catch(err){
      logger.error('Failed to get all users', err);
      return res.status(500).json({
        status: 'fail',
        message: 'cannot get users'
      });
    }
  };

  exports.updateUser = async (req, res) => {
    try{
    const user = await User.findByPk(req.params.id);
    delete req.body['deposit'];
    if (user) {
      await user.update(req.body);
      logger.info('User updated', user);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }catch(err){
    logger.error('Failed to update user', err);
    return res.status(500).json({
      status: 'fail',
      message: 'cannot update user'
    });
  }
  };


  exports.deleteUser = async (req, res) => {
    try{
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }catch(err){
    logger.error('Failed to update user', err);
    return res.status(500).json({
      status: 'fail',
      message: 'cannot delete user'
    });
  }
  };
