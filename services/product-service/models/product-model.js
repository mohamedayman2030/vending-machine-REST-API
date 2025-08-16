

module.exports=(sequelize,DataTypes)=>{
   Product = sequelize.define('Product',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,productModel:{
        type: DataTypes.STRING,
        allowNull: false
    }
    ,amountAvailable:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           isNumeric: true,
           min: 0
        },
    }
    ,productName:{
        type: DataTypes.STRING,
        allowNull: false
    }
    ,cost:{
       type: DataTypes.INTEGER,
       allowNull: false,
       validate:{
        isNumeric: true,
        min: 1
       }
    }
    ,sellerId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        tablename: 'Users',

      }
    }
});

Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  };

  return Product;
}