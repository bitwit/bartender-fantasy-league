import Ingredient from './Ingredient'

export default class IngredientCategory {
  id: string = ""
  name: string = ""
  description: string = ""
  ingredients: Ingredient[] = []

  constructor(id: string, name: string, ingredientData: any[] = []) {
    this.id = id
    this.name = name
    for(let ingData of ingredientData) {
      this.ingredients.push(new Ingredient(ingData))
    }
  }
}