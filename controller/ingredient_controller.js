const express = require("express")
const router = express.Router()

const { sucess, fail } = require("../helpers/response")
const IngredientModel = require("../model/ingredient_model")

const AuthServices = require('../services/auth_services');
const IngredientServices = require('../services/ingredient_services');

router.get("/", AuthServices.validateToken, (req, res) => {
    IngredientModel.list().then((ingredients) => {
        res.json(sucess(ingredients))
    })
})

router.get("/:id", AuthServices.validateToken, IngredientServices.validId, (req, res) => {
    IngredientModel.getById(req.params.id).then(ingredient => {
        res.json(sucess(ingredient))
    }).catch(err => {
        res.status(500).json(fail("Não foi possível localizar o ingrediente."))
    })
})

router.post("/", AuthServices.validateToken, IngredientServices.verifyAllData, (req, res) => {
    const { name, recipeId } = req.body

    IngredientModel.save(name, recipeId).then(ingredient => {
        res.json(sucess(ingredient))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar o novo ingrediente."))
    })
})

router.put("/:id", AuthServices.validateToken, IngredientServices.validId, IngredientServices.verifyAllData, (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name)
        return res.status(500).json(fail("Nenhum atributo do ingrediente foi modificado. Nome não inserido."))

    IngredientModel.update(id, name).then(ingredient => {
        if (ingredient)
            res.json(sucess(ingredient))
        else
            res.status(500).json(fail("Ingrediente não encontrado."))
    }).catch(err => {
        res.status(500).json(fail("Falha ao alterar o ingrediente."))
    })
})

router.delete("/:id", AuthServices.validateToken, IngredientServices.validId, (req, res) => {
    IngredientModel.delete(req.params.id).then(ingredient => {
        if (ingredient)
            res.json(sucess(ingredient))
        else
            res.status(500).json(fail("Ingrediente não encontrado."))
    }).catch(err => {
        res.status(500).json(fail("Falha ao excluir o ingrediente."))
    })
})

module.exports = router