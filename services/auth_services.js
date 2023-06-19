var jwt = require('jsonwebtoken');

const { fail } = require("../helpers/response")


function validateToken(req, res, next) {
  let token_full = req.headers['authorization']
  if (!token_full)
    token_full = ''
  let token = token_full.split(': ')[1]

  jwt.verify(token, '#Abcasdfqwr', (err, payload) => {
    if (err) {
      res.status(401).json(fail("Acesso negado - Token invalido"))
      return
    }
    req.user = payload.user
    next()
  })
}

function validateAdmin(req, res, next) {
  const { isAdmin } = req.user;

  if (isAdmin && isAdmin == true) {
    next();
  } else {
    res.status(401).json(fail("Acesso negado - Usuário não é administrador"))
  }

}


module.exports = {
  validateToken,
  validateAdmin
};