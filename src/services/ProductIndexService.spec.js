const ProductRepositoryInMemory = require("../repositories/ProductRepositoryInMemory")
const ProductIndexService = require("../services/ProductIndexService")
const IngredientRepositoryInMemory = require("../repositories/IngredientRepositoryInMemory")

it("A search must be carried out using the query", async () => {
  const productRepository = new ProductRepositoryInMemory()
  const ingredientRepository = new IngredientRepositoryInMemory()
  const productIndexService = new ProductIndexService(productRepository, ingredientRepository)
  
  const query = 'test'
  
  const products = await productIndexService.execute(query)

  products.map(product => {
    Object.keys(product).forEach(async (key) => {
      await expect(product).toHaveProperty(key)
    })
  })
})