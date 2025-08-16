

module.exports=(sequelize,DataTypes)=>{

User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,username: {
       type: DataTypes.STRING,
       allowNull: false
    }
    ,password:{
        type: DataTypes.STRING,
        allowNull: false
    }
    ,deposit:{
       type: DataTypes.BIGINT,
       allowNull: true,
    }
    , role: {
        type: DataTypes.ENUM('seller','buyer'),
        allowNull: false,

    }
},
{
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] }
      }
    }
})

User.associate = (models) => {
    User.hasMany(models.Product, {
      foreignKey: {
        name: 'sellerId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      as: 'products'
    });
  };

return User;
};
