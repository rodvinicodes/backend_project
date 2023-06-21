const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/database');

const RecipeIngredient = sequelize.define(
  'RecipeIngredient',
  {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: 'recipe_ingredients' }
);

module.exports = {
  Model: RecipeIngredient
};