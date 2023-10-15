const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class ProductUpdateService {
  constructor(productRepository, ingredientRepository){
    this.productRepository = productRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ id, title, description, price, category, ingredients }){

    const product = await this.productRepository.findProductById(id)

    if (!product) {
      throw new AppError("O product solicitado não existe!")
    }

    product.title = title ?? product.title
    product.description = description ?? product.description
    product.category = category ?? product.category
    product.price = price ?? product.price
    product.updated_at = knex.fn.now()

  
    if (ingredients) {
      const ingredientsInNewArray = ingredients.map(ingredient => {
  
        return {
          name: ingredient.trim(),
          product_id: product.id
        }
      })
  
      await this.ingredientRepository.create(ingredientsInNewArray)
    }
    
    const productUpdated = await this.productRepository.update({
      product,
      id
    })

    return productUpdated
  }
}

module.exports = ProductUpdateService