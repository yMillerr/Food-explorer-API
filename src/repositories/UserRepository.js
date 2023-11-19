const knex = require('../database/knex')

class UserRepository {
  async findUserByEmail(email){
    const user = await knex('users').where({ email }).first()

    return user
  }

  async create({ email, name, password}){
    const [userId] = await knex('users').insert({
      name,
      email,
      password
    })

    if (Number(userId) === 1) {
      await knex("users").update({
        admin: true
      }).where({ id: userId})
    }

    return { id: userId }
  }
}

module.exports = UserRepository