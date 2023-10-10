const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const checkEmailExists = await knex('users').where({ email }).first()

    if (checkEmailExists) {
      throw new AppError('Esse email já está em uso!')
    }

    await knex('users').insert({
      name,
      email,
      password: await hash(password, 10),
    })

    return response.json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const user = await knex('users').where({ id }).first()

    if (!user) {
      throw new AppError('O usuário não existe ou não foi autenticado!')
    }

    const checkEmailExists = await knex('users').where({ email }).first()

    if (checkEmailExists && checkEmailExists.id !== user.id) {
      throw new AppError('Esse email já está em uso!')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    user.updated_at = knex.fn.now()

    if (password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga!')
    }

    if (password && old_password) {
      const comparePassword = await compare(old_password, user.password)

      if (!comparePassword) {
        throw new AppError('Senha antiga está incorreta!')
      }

      user.password = await hash(password, 10)
    }

    await knex('users').update(user).where({ id })

    return response.json()
  }
}

module.exports = UsersController
