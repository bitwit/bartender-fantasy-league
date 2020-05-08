export default class Ingredient {
  id: string = ""
  name: string = ""
  description: string = ""

  valueWinter: number = 1
  valueSummer: number = 1

  mixProperties: string[] = []
  badMixProperties: string[] = []
  triggeredEvents: string[] = []

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }
}