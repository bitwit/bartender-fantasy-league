export default class Season {
  id: string
  name: string
  isWinter: boolean
  result: any | null

  constructor(id: string, name: string, isWinter: boolean = false) {
    this.id = id
    this.name = name
    this.isWinter = isWinter
    this.result = null
  }
}