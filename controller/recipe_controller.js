const express = require("express")
const router = express.Router()

const { sucess, fail } = require("../helpers/response")

const RecipeModel = require('../model/recipe_model')

const AuthServices = require('../services/auth_services');
const RecipeServices = require('../services/recipe_services');


router.get("/", AuthServices.validateToken, async (req, res) => {
    let recipes = await RecipeModel.list()
    res.json(sucess(recipes))
})

router.get("/:id", AuthServices.validateToken, RecipeServices.validId, async (req, res) => {
    let obj = await RecipeModel.getById(req.params.id)
    if (obj)
        res.json(sucess(obj))
    else
        res.status(500).json(fail("Não foi possível localizar a receita."))
})

router.post("/", AuthServices.validateToken, RecipeServices.verifyAllData, async (req, res) => {
    const { name, categoryId, ingredientIds, description, method } = req.body

    let obj = await RecipeModel.save(name, categoryId, ingredientIds, description, method);

    if (obj)
        res.json(sucess(obj))
    else
        res.status(500).json(fail("Erro ao salvar a nova receita."))
})

router.put("/:id", AuthServices.validateToken, RecipeServices.validId, RecipeServices.verifyAllData, async (req, res) => {
    const { id } = req.params
    const { name, categoryId, ingredientIds, description, method } = req.body

    let [result] = await RecipeModel.update(id, name, categoryId, ingredientIds, description, method);
    if (result)
        res.json(sucess(result))
    else
        res.status(500).json(fail("Falha ao alterar a receita."))
})

router.delete("/:id", AuthServices.validateToken, RecipeServices.validId, async (req, res) => {
    const { id } = req.params

    let result = await RecipeModel.delete(id)
    if (result)
        res.json(sucess(result))
    else
        res.status(500).json(fail("Receita não encontrada"))
})

module.exports = router