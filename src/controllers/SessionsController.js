const { compare } = require('bcryptjs')
const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()

    if (!user) {
      throw new AppError('Email e/ou senha incorreto(a)')
    }

    const thePasswordIsCorret = await compare(password, user.password)

    if (!thePasswordIsCorret) {
      throw new AppError('Email e/ou senha incorreto(a)')
    }
    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return response.json({
      user,
      token,
    })
  }
}

module.exports = SessionsController
