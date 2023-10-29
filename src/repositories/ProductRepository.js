const knex = require("../database/knex")

class ProductRepository  {
  async create({ title, description, category, price }){
    const productId = await knex('products').insert({
      title,
      description,
      category,
      price,
    })

    return productId[0]
  }

  async update({ product, id }){
    const product_id  = await knex('products').update(product).where({ id })

    return { 
      productId: product_id[0]
    }
  }

  async delete(id){
    const productDelete = await knex('products').where({ id }).delete()

    return productDelete
  }

  async findProductById(id){
    const product = await knex('products').where({ id }).first()

    return product
  }

  async queryProducts(query){
    const products = await knex('ingredients')
    .select(
      [
        'products.id',
        'products.description', 
        'products.category' ,
        'products.picture',
        'products.title', 
        'products.price',
      ])
    .whereLike('products.title', `%${query}%`)
    .orWhereLike('ingredients.name', `%${query}%`)
    .innerJoin('products', 'products.id', 'ingredients.product_id')
    .groupBy("products.id")
    .orderBy("products.title")

    return products
  }

  async fetchAllProducts(){
    const products = await knex("products").select("*")

    return products
  }

}

module.exports =  ProductRepository