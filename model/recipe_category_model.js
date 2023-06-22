const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")

const RecipeCategoryModel = sequelize.define('RecipeCategory',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: 'recipe_categories' }
);



module.exports = {
    list: async function () {
        const categorys = await RecipeCategoryModel.findAll()
        return categorys
    },

    save: async function (name) {
        const category = await RecipeCategoryModel.create({
            name: name,
        })

        return category
    },

    update: async function (id, name) {
        return await RecipeCategoryModel.update({ name: name }, {
            where: { id: id }
        })
    },

    delete: async function (id) {
        const category = await RecipeCategoryModel.findByPk(id)
        return category.destroy()
    },

    getById: async function (id) {
        return await RecipeCategoryModel.findByPk(id)
    },

    RecipeCategoryModel
}