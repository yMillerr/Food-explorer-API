class IngredientRepositoryInMemory {
  ingredients = [
    {
      id: 20,
      name: "test",
      product_id: 1,
    },
    {
      id: 20,
      name: "sucess",
      product_id: 1,
    },
    {
      id: 22,
      name: "failed",
      product_id: 2,
    },
    {
      id: 23,
      name: "test",
      product_id: 2,
    }
  ]

  create(ingredients){
    const product_id = ingredients.map(ingredient => {
      this.ingredients.push({...ingredient, id: new Date().getMilliseconds() })

      return ingredient.product_id
    })

    return product_id[0]
  }

  fetchAllIngredients(){
    return this.ingredients
  }

  findIngredientsByProductId(product_id){
    const ingredients = this.ingredients.map(ingredient => {
      if(ingredient.product_id === product_id){
        return []
      }

      return []
    })

    return ingredients
  }
}

module.exports = IngredientRepositoryInMemory