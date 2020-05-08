export default class Week {
  id: string
  name: string
  result: any | null

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.result = null
  }
}