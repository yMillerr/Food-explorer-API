const knex = require('../database/knex')

class IngredientsController {
  async delete(request, response) {
    const { id } = request.params

    await knex('ingredients').where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { product_id } = request.params

    const ingredients = await knex('ingredients').where({ product_id })

    return response.json(ingredients)
  }
}

module.exports = IngredientsController
