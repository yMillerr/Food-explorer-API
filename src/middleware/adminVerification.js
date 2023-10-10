const knex = require('../database/knex')
const AppError = require('../utils/AppError')

async function adminVerification(request, response, next) {
  const { id } = request.user

  const user = await knex("users").where({ id }).first()

  if(!user){
    throw new AppError("O usuário não foi encontrado")
  }

  if(!user.admin){
    throw new AppError("Você não pode acessar essa rota.")
  }

  next()
}

module.exports = adminVerification
