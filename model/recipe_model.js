const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")
const RecipeCategory = require('./recipe_category_model')
const RecipeIngredients = require('./recipe_ingredients_model')
const Ingredient = require('./ingredient_model')


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

RecipeModel.belongsTo(RecipeCategory.Model, { foreignKey: 'categoryId' });
RecipeCategory.Model.hasMany(RecipeModel, { foreignKey: 'categoryId' });

RecipeModel.belongsToMany(Ingredient.Model, { through: RecipeIngredients.Model, foreignKey: 'recipeId' });
Ingredient.Model.belongsToMany(RecipeModel, { through: RecipeIngredients.Model, foreignKey: 'ingredientId' });


module.exports = {
    list: async function () {
        const recipes = await Receita.findAll({
            include: [RecipeCategory.Model, Ingredient.Model]
        });

        return recipes
    },

    save: async function (name, categoryId, ingredientIds, description, method) {
        if (typeof categoryId === 'string') {
            obj = await RecipeCategory.getByName(category);
            if (!obj) {
                return null
            }
            categoryId = obj.id;
        }

        const recipe = await RecipeModel.create({
            name: name,
            description: description,
            method: method
        })

        const recipeCategory = await RecipeCategory.getById(categoryId);

        if (!recipeCategory) {
            return false;
        }

        await recipe.setRecipeCategory(recipeCategory);

        if (ingredientIds && ingredientIds.length > 0) {
            const ingredients = await Ingredient.findAll({
                where: { id: ingredientIds }
            });

            await recipe.addIngredient(ingredients);
        }

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

    Model: RecipeModel
}