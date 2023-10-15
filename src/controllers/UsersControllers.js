const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const { hash, compare } = require('bcryptjs')

const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require('../services/UserCreateService')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)
  
    await userCreateService.execute({ email, name, password })

    return response.json()
  }
}

module.exports = UsersController
