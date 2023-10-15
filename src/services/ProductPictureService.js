const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../utils/AppError")


class ProductPictureService {

  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ filename, id}) {
    const product = await this.productRepository.findProductById(id)

    const diskStorage = new DiskStorage()
  
    if(!product){
      throw new AppError("O produto solicitado não existe!")
    }
  
    if(product.picture){
      await diskStorage.deleteFile(product.picture)
    }
  
    await diskStorage.saveFile(filename)
    product.picture = filename
  
  
    await this.productRepository.update({
      product,
      id
    })

    return product
  }
}

module.exports = ProductPictureService