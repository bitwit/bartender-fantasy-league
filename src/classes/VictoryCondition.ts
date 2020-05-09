import { BusinessObject } from "../BusinessObject"

export default class VictoryCondition {
  id: string
  name: string
  icon: string

  description: string = "An event occurred"
  priority: number = 0

  constructor(name: string, id: string, icon: string) {
    this.name = name
    this.id = id
    this.icon = icon
  }

  hasBusinessMetConditions(business: BusinessObject) {
    return false
  }
}
