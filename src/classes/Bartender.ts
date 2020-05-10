import Difficulty from '../enums/Difficulty'

export default class Bartender {
  id: string = ""
  name: string = ""
  title: string = ""
  expressions: string = "male" // facial expressions
  multiplier: number = 1
  difficulty: Difficulty = Difficulty.Easy
  description: string = ""

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.title = data.title
    this.description = data.description
    this.expressions = data.expressions
    this.multiplier = parseInt(data.multiplier)
    this.difficulty = data.difficulty
  }
}