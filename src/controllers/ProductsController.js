const ProductRepository = require("../repositories/ProductRepository")
const ProductCreateService = require("../services/ProductCreateService")
const ProductUpdateService = require("../services/ProductUpdateService")
const ProductIndexService = require("../services/ProductIndexService")
const IngredientRepository = require("../repositories/IngredientRepository")


class ProductsController {
  async create(request, response) {
  
    const { title, description, category, price, ingredients } = request.body

    const productRepository = new ProductRepository()
    const ingredientRepository = new IngredientRepository()
    const productCreateService = new ProductCreateService(productRepository, ingredientRepository)

    const productId  = await productCreateService.execute({
      title,
      description,
      category,
      price,
      ingredients
    })

    return response.json({ ...productId })
  }

  async update(request, response) {
    const { id } = request.params
    const { title, description, category, price, ingredients } = request.body

    const productRepository = new ProductRepository()
    const ingredientRepository = new IngredientRepository()
    const productUpdateService = new ProductUpdateService(productRepository, ingredientRepository)


    await productUpdateService.execute({
      id,
      title,
      description,
      category,
      price,
      ingredients
    })

    return response.json()
  }

  async delete(request, response) {
    const { id } = request.params

    const productRepository = new ProductRepository()

    await productRepository.delete(id)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const ingredientRepository = new IngredientRepository()
    const productRepository = new ProductRepository()


    const product = await productRepository.findProductById(id)
    const ingredients = await ingredientRepository.findIngredientsByProductId(id)

    return response.json({
      ...product,
      ingredients,
    })
  }

  async index(request, response) {
    const { query } = request.query

    const productRepository = new ProductRepository()
    const ingredientRepository = new IngredientRepository()
    const productIndexService = new ProductIndexService(productRepository, ingredientRepository)

    const products = await productIndexService.execute(query)

    return response.json(products)
  }
}

module.exports = ProductsController
