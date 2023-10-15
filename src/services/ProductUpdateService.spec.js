const IngredientRepositoryInMemory = require("../repositories/IngredientRepositoryInMemory")
const ProductRepositoryInMemory = require("../repositories/ProductRepositoryInMemory")
const ProductUpdateService = require("../services/ProductUpdateService")
const AppError = require("../utils/AppError")

describe("ProducUpdateService", () => {
  this.productUpdateService = null

  beforeEach(() => {
    const productRepository = new ProductRepositoryInMemory()
    const ingredientRepository = new IngredientRepositoryInMemory()
    this.productUpdateService = new ProductUpdateService(productRepository, ingredientRepository)
  })

  it("Product should not be updated if it does not exist", async () => {
    const id = 5

    expect(async () => {
      await this.productUpdateService.execute({
        id
      })
    }).rejects.toEqual(new AppError("O product solicitado não existe!"))
  })

  it("The product must be updating", async () => {

    const product = {
      id: 1,
      title: "Test in tested",
      description: "tested",
      price: 10,
      category: 'tested',
      picture: 'tested.png',
      ingredients: ["testing", "to", "tested"]
    }

    const productUpdated = await this.productUpdateService.execute(product)

    expect(productUpdated).toHaveProperty('productId')
  })
})