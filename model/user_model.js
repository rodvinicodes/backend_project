const { DataTypes, Op } = require("sequelize")
const sequelize = require("../helpers/database")

const UserModels = sequelize.define('User',
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  },

)

module.exports = {
  list: async function () {
    const users = await UserModels.findAll()
    return users
  },

  save: async function (username, password, isAdmin) {
    var isAdminContains = false;

    if (isAdmin) {
      isAdminContains = isAdmin;
    }

    const user = await UserModels.create({
      username: username,
      password: password,
      isAdmin: isAdminContains
    })

    return user
  },

  update: async function (id, username, password, isAdmin) {
    var isAdminContains = false;

    if (isAdmin) {
      isAdminContains = isAdmin;
    }

    return await UserModels.update({ username: username, password: password, isAdmin: isAdminContains }, {
      where: { id: id }
    })
  },

  delete: async function (id) {
    return await UserModels.destroy({ where: { id: id } })
  },

  getById: async function (id) {
    return await UserModels.findByPk(id)
  },

  getByUsername: async function (username) {
    return await UserModels.findOne({
      where: {
        username: {
          [Op.like]: '%' + username + '%'
        }
      }
    })
  },

  Model: UserModels
}