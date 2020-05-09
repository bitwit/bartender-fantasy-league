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
    this.valueWinter = data.valueWinter
    this.valueSummer = data.valueSummer
    this.mixProperties = data.mixProperties.split(",")
    this.badMixProperties = data.badMixProperties.split(",")
    this.triggeredEvents = data.triggeredEvents.split(",")
  }

}