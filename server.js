require('dotenv').config();
const app = require('./app.js');
const {sequelize} = require('./configs/database.js');

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('DB synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
    console.error('Error syncing DB:', err);
  });

