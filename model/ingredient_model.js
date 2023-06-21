const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")
const Recipe = require('./recipe_model')

const IngredientModel = sequelize.define('Ingredient',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    { tableName: 'ingredients' }
)

// IngredientModel.belongsToMany(Recipe.Model, { through: 'ingredientsId' });
// Recipe.Model.belongsToMany(IngredientModel, { through: 'ingredientsId' });


module.exports = {
    list: async function () {
        const ingredients = await IngredientModel.findAll()
        return ingredients
    },

    save: async function (name) {
        const ingredient = await IngredientModel.create({
            name: name
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

    Model: IngredientModel
}