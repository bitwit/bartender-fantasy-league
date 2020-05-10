export default class Ingredient {
  id: string = ""
  name: string = ""
  description: string = ""
  imageId: string = ""

  valueWinter: number = 1
  valueSummer: number = 1

  mixProperties: string[] = []
  badMixProperties: string[] = []

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.imageId = data.imageId
    this.valueWinter = parseInt(data.valueWinter) || 1
    this.valueSummer = parseInt(data.valueSummer) || 1
    this.mixProperties = data.mixProperties.split(",").filter((x: string) => { return x != ""})
    this.badMixProperties = data.badMixProperties.split(",").filter((x: string) => { return x != ""})
  }

}