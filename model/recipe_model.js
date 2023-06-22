const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")
const { RecipeCategoryModel } = require('./recipe_category_model')


const RecipeModel = sequelize.define('Recipe',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        method: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    { tableName: 'recipes' }
)

RecipeModel.belongsTo(RecipeCategoryModel, { foreignKey: "categoryId" })

module.exports = {
    list: async function () {
        const recipes = await RecipeModel.findAll({
            include: [{ model: RecipeCategoryModel }]
        });

        return recipes
    },

    save: async function (name, categoryId, description, method) {
        const recipe = await RecipeModel.create({
            name: name,
            description: description,
            method: method,
            categoryId
        })

        //  await recipe.setRecipeCategory(recipeCategory);

        // const recipeCategory = await RecipeCategory.getById(categoryId);

        // if (!recipeCategory) {
        //     return false;
        // }

        // await recipe.setRecipeCategory(recipeCategory);

        // if (ingredientIds && ingredientIds.length > 0) {
        //     const ingredients = await Ingredient.findAll({
        //         where: { id: ingredientIds }
        //     });

        //     await recipe.addIngredient(ingredients);
        // }

        return recipe;
    },

    update: async function (id, name, categoryId, ingredientIds, description, method) {
        let recipe = await RecipeModel.finddByPk(id)

        if (!recipe) {
            return false
        }

        if (categoryId) {
            const recipeCategory = await RecipeCategory.findByPk(categoryId);
            if (!recipeCategory) {
                return false;
            }

            await recipe.setRecipeCategory(recipeCategory);
        }


        await recipe.update({ name, method, description });

        if (ingredientIds && ingredientIds.length > 0) {
            const ingredients = await Ingredient.findAll({
                where: { id: ingredientIds }
            });

            await recipe.setIngredient(ingredients);
        } else {
            await recipe.setIngredient([]);
        }

        return recipe
    },

    delete: async function (id) {
        const recipe = await RecipeModel.findByPk(id)
        return recipe.destroy()
    },

    getById: async function (id) {
        const receita = await RecipeModel.findByPk(id, {
            include: [RecipeCategory.Model, Ingredient.Model]
        });

        return receita;
    },

    RecipeModel
}