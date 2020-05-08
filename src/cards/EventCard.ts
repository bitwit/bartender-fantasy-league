import { BusinessObject } from '../BusinessObject'
import Thresholds from '../interfaces/Thresholds'

export default class EventCard {
  id: string
  name: string
  icon: string
  expiry: number
  description: string
  isRejectable: boolean
  acceptText: string
  rejectText: string
  cost: number
  equity: number
  thresholds: Thresholds

  constructor(name: string, id: string, icon: string) {
    this.name = name
    this.id = id
    this.icon = icon
    this.expiry = -1 //never expires
    this.description = "An event occurred"
    this.isRejectable = true
    this.acceptText = "Accept"
    this.rejectText = "Reject"
    this.cost = 0
    this.equity = 0
    this.thresholds = {
      development: 0,
      design: 0,
      marketing: 0,
      research: 0,
      sales: 0,
      fundraising: 0,
      productivity: 0,
      cash: 0,
      equity: 0
    }
  }

  hasBusinessMetConditions(business: BusinessObject): boolean {
    let thresholdsMet = true
    const thresholds: any = this.thresholds
    const currentStats: any = business.stats
    for(let statName in this.thresholds) {
      let value = thresholds[statName]
      if (value != 0 && value > currentStats[statName]) {
        thresholdsMet = false
      }
    }
    return thresholdsMet
  }

  tick(business: BusinessObject): void {
    if (this.expiry === -1) {
      return
    }
    else {
      this.expiry--
      if (this.expiry <= 0) {
        const index = business.assets.indexOf(this)
        business.assets.splice(index, 1)
        this.onDestroy(business)
      }
    }
  }

  onAccept(business: BusinessObject) {
    business.stats.cash -= this.cost
  }

  onReject(business: BusinessObject) {

  }

  onDestroy(business: BusinessObject) {

  }

}