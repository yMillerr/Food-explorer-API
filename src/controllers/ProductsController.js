const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ProductsController {
  async create(request, response) {
  
    const { title, description, category, price, ingredients } = request.body

    const [product_id] = await knex('products').insert({
      title,
      description,
      category,
      price,
    })

    const ingredientsFilter = ingredients.map((ingredient) => {
      return {
        product_id: product_id,
        name: ingredient,
      }
    })

    await knex('ingredients').insert(ingredientsFilter)

    if(!product_id){
      throw new AppError("Não foi possível criar esse produto!!")
    }


    return response.json(product_id)
  }

  async update(request, response) {
    const { id } = request.params
    const { title, description, category, price, ingredients } = request.body

    const product = await knex('products').where({ id }).first()

    if (!product) {
      throw new AppError('O produto procurado não existe!!')
    }

    product.title = title ?? product.title
    product.description = description ?? product.description
    product.category = category ?? product.category
    product.price = price ?? product.price
    product.updated_at = knex.fn.now()

    if (ingredients) {
      const ingredientsInNewArray = ingredients.map(ingredient => {

        return {
          name: ingredient.trim(),
          product_id: product.id
        }
      })

      await knex("ingredients").insert(ingredientsInNewArray)
    }
    
    await knex('products').update(product).where({ id })

    return response.json()
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('products').where({ id }).delete()

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const products = await knex('products').where({ id }).first()
    const ingredients = await knex('ingredients').where({ product_id: id })

    return response.json({
      ...products,
      ingredients,
    })
  }

  async index(request, response) {
    const { query } = request.query

    let products 
    
    if (query) {
      products = await knex('ingredients')
        .select(
          [
            'products.id',
            'products.title', 
            'products.description', 
            'products.category' ,
            'products.picture', 
            'products.price',
          ])
        .whereLike('products.title', `%${query}%`)
        .orWhereLike('ingredients.name', `%${query}%`)
        .innerJoin('products', 'products.id', 'ingredients.product_id')
        .groupBy("products.id")
        .orderBy("products.title")
    }  else {
      products = await knex("products").select("*")
    }

    const ingredientsQuery = await knex('ingredients')

    const productsWithIngredients = products.map((product) => {
      const ingredientsFilter = ingredientsQuery.filter(
        (ingredients) => product.id === ingredients.product_id,
      )

      return {
        ...product,
        ingredients: ingredientsFilter,
      }
    })

    return response.json(productsWithIngredients)
  }
}

module.exports = ProductsController
