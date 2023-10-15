const ProductRepository = require("../repositories/ProductRepository")
const ProductPictureService = require("../services/ProductPictureService")

class ProductsPictureController {
  async update(request, response){
    const { filename } = request.file
    const { id } = request.params

    const productRepository = new ProductRepository()
    const productPictureService = new ProductPictureService(productRepository)

    const pictureUpdated = await productPictureService.execute({
      filename,
      id
    })
   
    response.json(pictureUpdated)
  }
}

module.exports = ProductsPictureController

