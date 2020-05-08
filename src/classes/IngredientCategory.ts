import Ingredient from './Ingredient'

export default class IngredientCategory {
  id: string = ""
  name: string = ""
  description: string = ""
  ingredients: Ingredient[] = []

  constructor(id: string, name: string, ingredients: Ingredient[] = []) {
    this.id = id
    this.name = name
    this.ingredients = ingredients
  }
}