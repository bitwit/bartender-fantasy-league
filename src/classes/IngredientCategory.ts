import Ingredient from './Ingredient'

export default class IngredientCategory {
  id: string = ""
  name: string = ""
  description: string = ""
  ingredients: Ingredient[] = []
  canSelectNone: boolean = false

  constructor(id: string, name: string, ingredientData: any[] = []) {
    this.id = id
    this.name = name
    for(let ingData of ingredientData) {
      let ingredient = new Ingredient(ingData)
      if (ingredient.id == "none") {
        this.canSelectNone = true
      } else {
        this.ingredients.push(ingredient)
      }
    }
  }
}