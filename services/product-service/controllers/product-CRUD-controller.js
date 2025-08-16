const { Product, User } = require('../../../configs/database.js');
const { updateInventory } = require('../../inventory-service/controllers/inventory-controller.js');
const {sequelize} = require('../../../configs/database.js');
const logger = require('../../../utils/logger.js');
exports.createProduct = async (req, res) => {
    try {
      const { productModel, amountAvailable, productName, cost} = req.body;
      const sellerId = req.user.id;
  
      // Optional: ensure seller (user) exists
      const seller = await User.findByPk(sellerId);
      if (!seller) return res.status(404).json({ error: 'Seller not found' });
  
      const product = await Product.create({
        productModel,
        amountAvailable,
        productName,
        cost,
        sellerId,
      });
      logger.info('product created', product);
      return res.status(200).json(product);
    } catch (err) {
      logger.error('failed to create product',err);
      return res.status(500).json({ 
        status: 'fail',
        message: 'cannot create product' });
    }
  };
  
  // Get all products
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (err) {
      logger.error('failed to create product',err);
      return res.status(500).json({ 
        status: 'fail',
        message: 'cannot get all products' });
    }
    
  };
  
  // Get a single product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
  
      if (!product) return res.status(404).json({ error: 'Product not found' });
      logger.info('got product', product);
      res.json(product);
    } catch (err) {
      logger.error('failed to get product',err);
      return res.status(500).json({ 
        status: 'fail',
        message: 'cannot get product' });
    
    }
  };
  
  // Update a product

  exports.updateProductDetails = async(req,res) =>{
     try{
        const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      if(req.body.quantity || req.body.cost){
        return res.status(403).json({
            status: "fail",
            message: "can't update price or quantity"
        })
      }else{
        await product.update(req.body);
        res.status(200).json({
            status: 'success',
            message: 'product updated successfully',
            product
        });
      }
     }catch(err){
      logger.error('cannot update details',err);
        res.status(500).json({
            status: 'fail',
            message: 'internal server error'
        })
     }
  }

  exports.updateProductQuantity = async (req, res) => {
    try {
      const { quantity } = req.body;
      const { id } = req.params;
  
      if (quantity == null || !id) {
        return res.status(400).json({
          status: 'fail',
          message: 'missing quantity or product id'
        });
      }
  
      await updateInventory({ id, quantity });
  
      return res.status(200).json({
        status: 'success',
        message: 'quantity updated successfully'
      });
  
    } catch (err) {
      const statusCode = err.status || 500;
      const message = err.message || 'Internal server error';
      logger.error('cannot update quantity',err);
      return res.status(statusCode).json({
        status: 'fail',
        message
      });
    }
  };

  exports.updateProductCost = async (req, res) => {
    if (!req.body.cost || !req.params.id) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing product ID or cost',
      });
    }
  
    try {
      await sequelize.transaction(async (t) => {
        const product = await Product.findByPk(req.params.id, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
  
        if (!product) {
          const error = new Error("Can't find product with this ID");
          error.status = 404;
          throw error;
        }
  
        const newCost = parseFloat(req.body.cost);
        if (isNaN(newCost) || newCost < 1) {
          const error = new Error("Cost must be a number greater than or equal to 1");
          error.status = 400;
          throw error;
        }
  
        product.cost = newCost;
        await product.save({ transaction: t });
      });
  
      return res.status(200).json({
        status: 'success',
        message: 'Cost updated successfully',
      });
  
    } catch (err) {
      logger.error('cannot update cost',err);
      const statusCode = err.status || 500;
      return res.status(statusCode).json({
        status: 'fail',
        message: err.message || 'Internal server error',
      });
    }
  };
  
  // Delete a product
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      await product.destroy();
      logger.info('product deleted',product);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      logger.error('cannot delete product',err);
      res.status(500).json({ error: err.message });
    }
  };