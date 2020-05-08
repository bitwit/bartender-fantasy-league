import Difficulty from '../enums/Difficulty'

export default class Bartender {
  id: string = ""
  name: string = ""
  title: string = ""
  multiplier: number = 1
  difficulty: Difficulty = Difficulty.Easy
  description: string = ""

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}