class ProductIndexService { 

  constructor(productRepository, ingredientRepository) {
    this.productRepository = productRepository
    this.ingredientRepository = ingredientRepository
  }

  async execute(query){
    let products 
    
    if (query) {
      products = await this.productRepository.queryProducts(query)
    }  else {
      products = await this.productRepository.fetchAllProducts()
    }

    const ingredientsQuery = await this.ingredientRepository.fetchAllIngredients()

    const productsWithIngredients = products.map((product) => {
      if(product){
        const ingredientsFilter = ingredientsQuery.filter(
          (ingredients) => product.id === ingredients.product_id,
        )
  
        return {
          ...product,
          ingredients: ingredientsFilter,
        }
      }
    })

    return productsWithIngredients
  }
}

module.exports = ProductIndexService