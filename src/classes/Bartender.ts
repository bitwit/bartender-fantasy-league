import Difficulty from '../enums/Difficulty'

export default class Bartender {
  id: string = ""
  name: string = ""
  title: string = ""
  multiplier: number = 1
  difficulty: Difficulty = Difficulty.Easy
  description: string = ""
  event: string = ""

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.multiplier = data.multiplier
    this.difficulty = data.difficulty
    this.event = data.event
  }
}