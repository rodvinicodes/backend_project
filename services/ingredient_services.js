
const { fail } = require("../helpers/response")

const IngredientModel = require('../model/ingredient_model')

function validId(req, res, next) {
  let id = parseInt(req.params.id);

  if (id != id || id < 1) {
    res.status(500).json(fail("Por favor digite um ID Válido."))
    return;
  }

  let ingredient = IngredientModel.getById(id);

  if (ingredient != null && ingredient != undefined) {
    req.data = ingredient;
    return next();
  }

  res.status(404).json(fail("Ingrediente não encontrada."))
}

function verifyAllData(req, res, next) {
  const { name } = req.body

  if (name != undefined) {
    next();
  } else {
    res.status(500).json(fail("Por favor envie todos os dados do ingrediente."))
  }
}

module.exports = {
  validId,
  verifyAllData
};