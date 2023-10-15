const IngredientRepositoryInMemory = require("./IngredientRepositoryInMemory")

class ProductRepositoryInMemory {
  products = [
    {
      id: 1,
      title: "Test in Testing",
      description: "testing...",
      price: 100,
      picture: 'test.png',
      category: 'testing',
    },
    {
      id: 2,
      title: "Failed test",
      description: "failed",
      price: 100,
      picture: 'test.png',
      category: 'fail',
    }
  ]
  
  create({ title, description, category, price}){
    const product = {
      id: Math.floor(Math.random() * 1000 + 1),
      title,
      description,
      category,
      price
    }

    this.products.push(product)

    return product.id
  }

  findProductById(id){
    const product = this.products.find(product => product.id === id)

    return product
  }

  update({ title, description, price, category, id}){
    const productUpdated = this.products.map(product => {
      if(product.id === id){
        return {
          title,
          description,
          price,
          category
        }
      }
    })

    const findProduct = this.products.find(product => product.id === id)

    return {
      productId: findProduct.id
    }
  }

  queryProducts(query) {
    const products = []

    const ingredientRepository = new IngredientRepositoryInMemory()

    this.products.map(product => {
      if (product.title === query) {
        return products.push(product)
      }
    })
    

    if (products.length <= 0) {
      ingredientRepository.ingredients.map(ingredient => {
        if (ingredient.name === query) {
          return this.products.map(product => {
            if (product.id === ingredient.product_id) {
              return products.push(product)
            }
          })
        }
      })
    }

    return products
  }

  fetchProducts(){
    const products = this.products.map(product => {
      const ingredients = this.ingredients.filter(ingredient => ingredient.product_id === product.id)

      return {
        product,
        ...ingredients,
      }
    })

    return products
  }
}

module.exports = ProductRepositoryInMemory