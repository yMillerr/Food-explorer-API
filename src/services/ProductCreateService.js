
class ProductCreateService {
  constructor(productRepository, ingredientRepository){
    this.productRepository = productRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute({ title, description, price, category, ingredients }){

    const productId = await this.productRepository.create({
      title,
      description,
      price,
      category
    })

    let ingredientsFilter;

    if (ingredients) {
      ingredientsFilter = ingredients.map((ingredient) => {
        return {
          product_id: productId,
          name: ingredient?.name ?? ingredient,
        }
      })
    }

    await this.ingredientRepository.create(ingredientsFilter)

    return {
      productId
    }
  }
}

module.exports = ProductCreateService