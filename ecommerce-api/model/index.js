const sequelize = require('../config/connection');

const Cart = require('./cart.model');
const Category = require('./category.model');
const User = require('./user.model');
const Product = require('./product.model');

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

Category.hasMany(Cart, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('All tables created or already exist');
  } catch (err) {
    console.error(`Error syncing models: ${err}`);
  }
};

module.exports = {
  User,
  Cart,
  Product,
  Category,
  syncDatabase,
};
