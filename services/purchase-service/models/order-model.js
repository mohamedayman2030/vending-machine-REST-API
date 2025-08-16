module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          tablename: 'Products',
          key: 'id'
        },
        onDelete: 'SET NULL', // Optional: Or you can remove this line entirely
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          tablename: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL', // Optional: Or remove
      },
      quantityPurchased: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      },
      totalCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1
        }
      }
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        as: 'buyer' 
      });
    
      Order.belongsTo(models.Product, {
        foreignKey: {
          name: 'productId',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
        as: 'product'
      });
    };
    return Order;
  };