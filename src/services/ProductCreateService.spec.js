const ProductRepositoryInMemory = require("../repositories/ProductRepositoryInMemory")
const ProductCreateService = require("../services/ProductCreateService")
const IngredientRepositoryInMemory = require("../repositories/IngredientRepositoryInMemory")

it("The product must be created", async () => {
  const productRepository = new ProductRepositoryInMemory()
  const ingredientRepository = new IngredientRepositoryInMemory()
  const productCreateService = new ProductCreateService(productRepository, ingredientRepository)

  const productCreate = await productCreateService.execute({
    title: 'Teste',
    description: 'Testing',
    price: 10,
    category: 'tested',
    ingredients: ["test", "testing", "tested"]
  })

  expect(productCreate).toHaveProperty('productId')
}) 