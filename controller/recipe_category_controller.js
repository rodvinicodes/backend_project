const express = require("express")
const router = express.Router()

const { sucess, fail } = require("../helpers/response")
const RecipeCategoryModel = require("../model/recipe_category_model")

const RecipeCategoryServices = require('../services/recipe_category_services');
const AuthServices = require('../services/auth_services');


router.get("/", AuthServices.validateToken, (req, res) => {
    RecipeCategoryModel.list().then((categories) => {
        res.json(sucess(categories))
    })
})

router.get("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, (req, res) => {
    RecipeCategoryModel.getById(req.params.id).then(category => {
        res.json(sucess(category))
    }).catch(err => {
        consol.elog(err)
        res.status(500).json(fail("Não foi possível localizar a categoria."))
    })
})

router.post("/", AuthServices.validateToken, RecipeCategoryServices.verifyAllData, (req, res) => {
    const { name } = req.body

    RecipeCategoryModel.save(name).then(category => {
        res.json(sucess(category))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao salvar a nova categoria."))
    })
})

router.put("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, RecipeCategoryServices.verifyAllData, (req, res) => {
    const { id } = req.params
    const { name } = req.body

    if (!name) {
        return res.status(500).json(fail("Nenhum atributo da categoria foi modificada."))
    }

    RecipeCategoryModel.update(id, name).then(category => {
        if (category)
            res.json(sucess(category))
        else
            res.status(500).json(fail("Categoria não encontrada."))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao alterar a categoria."))
    })
})

router.delete("/:id", AuthServices.validateToken, RecipeCategoryServices.validId, (req, res) => {
    RecipeCategoryModel.delete(req.params.id).then(category => {
        if (category)
            res.json(sucess(category))
        else
            res.status(500).json(fail("Categoria não encontrada."))
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha ao excluir a categoria."))
    })
})

module.exports = router