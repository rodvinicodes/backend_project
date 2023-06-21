const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AuthServices = require('../services/auth_services');
const UserModel = require('../model/user_model')
const { sucess, fail } = require("../helpers/response")


router.post('/', async function (req, res) {
    const { username, password } = req.body

    let obj = await UserModel.save(username, password);

    if (obj)
        res.json(sucess(obj))
    else
        res.status(500).json(fail("Falha na criação do usuário."))
})

router.put('/:id', AuthServices.validateToken, async function (req, res) {
    const { id } = req.params
    const { username, password } = req.body;
    const oldUser = req.user;
    if (parseInt(id) == parseInt(oldUser.id)) {
        let [result] = await UserModel.update(id, username, password, false);

        if (result)
            res.json(sucess(result))
        else
            res.status(500).json(fail("Falha ao alterar o usuário."))
    } else
        res.status(500).json(fail("Falha ao alterar o usuário. Você apenas pode alterar o seu próprio usuário."))
})

router.put('/admin/:id', AuthServices.validateToken, AuthServices.validateAdmin, async function (req, res) {
    const { id } = req.params
    const { username, password, isAdmin } = req.body;

    let [result] = await UserModel.update(id, username, password, isAdmin);

    if (result)
        res.json(sucess(result))
    else
        res.status(500).json(fail("Falha ao alterar o usuário."))
})


router.delete('/admin/:id', AuthServices.validateToken, AuthServices.validateAdmin, async function (req, res) {
    const id = req.params.id;

    let user = await UserModel.getById(id)

    if (user) {
        if (user.isAdmin == true) {
            res.status(500).json(fail("Não é possível deletar um usuário administrador."))
        } else {
            let result = await UserModel.delete(req.params.id);

            if (result)
                res.json(sucess(result))
            else
                res.status(500).json(fail("Erro na deletação do usuário."))
        }
    } else {
        res.status(500).json(fail("Usuário não encontrado."))
    }

})


router.post('/admin', AuthServices.validateToken, AuthServices.validateAdmin, async function (req, res) {
    const { username, password } = req.body

    let obj = await UserModel.save(username, password, true);

    if (obj)
        res.json(sucess(obj))
    else
        res.status(500).json(fail("Falha na criação do usuário."))

})


router.post('/auth', async function (req, res) {
    const { username, password } = req.body

    let user = await UserModel.getByUsername(username);

    if (user && user.username == username && user.password == password) {
        let token = jwt.sign({ user: user }, '#Abcasdfqwr', {
            expiresIn: '20 min'
        })
        res.json(sucess({
            token, user: {
                username, password
            }
        }))
    } else {
        res.status(404).json(fail("Usuário ou senha inválido."))
    }
})


module.exports = router;
