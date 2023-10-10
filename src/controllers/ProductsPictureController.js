const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../utils/AppError")

class ProductsPictureController {
  async update(request, response){
    const { filename } = request.file
    const { id } = request.params

    const product = await knex("products").where({ id }).first()

    const diskStorage = new DiskStorage()

    if(!product){
      throw new AppError("Esse produto não existe!")
    }

    if(product.picture){
      await diskStorage.deleteFile(product.picture)
    }

    await diskStorage.saveFile(filename)
    product.picture = filename


    await knex("products").update(product).where({ id })

    response.json(product)
  }
}

module.exports = ProductsPictureController

