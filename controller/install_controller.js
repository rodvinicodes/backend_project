const express = require("express")
const router = express.Router()
const sequelize = require("../helpers/database")

const UserModel = require('../model/user_model')

const { sucess, fail } = require("../helpers/response")

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })

    let user = await UserModel.save('admin', 'admin', true);

    res.json(sucess({ user: user }),)
})

module.exports = router