const IngredientsRepository = require("../repositories/IngredientRepository")

class IngredientsController {
  async delete(request, response) {
    const { id } = request.params

    const ingredientsRepository = new IngredientsRepository()

    await ingredientsRepository.delete(id)

    return response.json()
  }

  async index(request, response) {
    const { product_id } = request.params

    const ingredientsRepository = new IngredientsRepository()

    const ingredients = await ingredientsRepository.findIngredientsByProductId(product_id)

    return response.json(ingredients)
  }
}

module.exports = IngredientsController
