const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/database")

const UserModel = require('../model/user_model')
const RecipeCategoryModel = require('../model/recipe_category_model')
const IngredientModel = require('../model/ingredient_model')
const RecipesModel = require('../model/recipe_model')


const { sucess, fail } = require("../helpers/response")

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })

    let user = await UserModel.save('admin', 'admin', true);

    // const ingredients = ['Arroz', 'Feijão', 'Farinha'];
    // const categories = ['Massas', 'Doces', 'Assados'];

    // for (var i = 0; i < ingredients.length; i++) {
    //     await IngredientModel.save(ingredients[i]);
    // }

    // for (var i = 0; i < categories.length; i++) {
    //     await RecipeCategoryModel.save(categories[i]);
    // }


    res.json(sucess({ user }),)
})

module.exports = router