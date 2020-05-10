export default class Ingredient {
  id: string = ""
  name: string = ""
  description: string = ""

  valueWinter: number = 1
  valueSummer: number = 1

  mixProperties: string[] = []
  badMixProperties: string[] = []
  triggeredEvents: string[] = []

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.valueWinter = parseInt(data.valueWinter)
    this.valueSummer = parseInt(data.valueSummer)
    this.mixProperties = data.mixProperties.split(",").filter((x: string) => { return x != ""})
    this.badMixProperties = data.badMixProperties.split(",").filter((x: string) => { return x != ""})
    this.triggeredEvents = data.triggeredEvents.split(",").filter((x: string) => { return x != ""})
  }

}