const ProductRepositoryInMemory = require("../repositories/ProductRepositoryInMemory")
const AppError = require("../utils/AppError")
const ProductPictureService = require("./ProductPictureService")

it("If the product does not exist, the picture must not be changed", () => {
  const id = new Date().getMilliseconds()

  const productRepository = new ProductRepositoryInMemory()
  const productPictureService = new ProductPictureService(productRepository)

  expect(async () => {
    await productPictureService.execute({
      id
    })
  }).rejects.toEqual(new AppError("O produto solicitado não existe!"))
})

