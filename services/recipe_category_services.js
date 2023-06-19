
const { fail } = require("../helpers/response")

const RecipeCategoryModel = require('../model/recipe_category_model')

function validId(req, res, next) {
  let id = parseInt(req.params.id);

  if (id != id || id < 1) {
    res.status(500).json(fail("Por favor digite um ID Válido."))
    return;
  }

  let category = RecipeCategoryModel.getById(id);

  if (category != null && category != undefined) {
    req.data = category;
    return next();
  }

  res.status(404).json(fail("Categoria não encontrada."))
}

function verifyAllData(req, res, next) {
  const { name } = req.body

  if (name != undefined) {
    next();
  } else {
    res.status(500).json(fail("Por favor envie todos os dados da categoria."))
  }
}

module.exports = {
  validId,
  verifyAllData
};