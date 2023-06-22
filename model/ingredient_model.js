const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")
const { RecipeModel } = require('./recipe_model')

const IngredientModel = sequelize.define('Ingredient',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    { tableName: 'ingredients' }
)

IngredientModel.belongsTo(RecipeModel, { foreignKey: 'recipeId' });

module.exports = {
    list: async function () {
        const ingredients = await IngredientModel.findAll({
            include: [{ model: RecipeModel }]
        })

        return ingredients
    },

    save: async function (name, recipeId) {
        const ingredient = await IngredientModel.create({
            name: name,
            recipeId
        })

        return ingredient
    },

    update: async function (id, name) {
        return await IngredientModel.update({ name: name }, {
            where: { id: id }
        })
    },

    delete: async function (id) {
        return await IngredientModel.destroy({ where: { id: id } })
    },

    getById: async function (id) {
        return await IngredientModel.findByPk(id)
    },

    getByName: async function (name) {
        return await IngredientModel.findOne({
            where: {
                name: {
                    [Op.like]: '%' + name + '%'
                }
            }
        })
    },

    IngredientModel
}