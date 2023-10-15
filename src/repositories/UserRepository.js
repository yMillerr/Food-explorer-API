const knex = require('../database/knex')

class UserRepository {
  async findUserByEmail(email){
    const user = await knex('users').where({ email }).first()

    return user
  }

  async create({ email, name, password}){
    const userId = await knex('users').insert({
      name,
      email,
      password
    })

    return { id: userId }
  }
}

module.exports = UserRepository