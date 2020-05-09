import { BusinessObject } from '../BusinessObject'
import AppState from '../AppState'

export default class EventCard {
  id: string
  name: string
  expiryInWeeks: number
  description: string
  cost: number
  baseCustomersMod: number
  priceMod: number // price per drink sold
  prerequisiteEvents: string[]
  isRejectable: boolean
  acceptText: string
  rejectText: string

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.expiryInWeeks = parseInt(data.expiryInWeeks || 1)
    this.description = data.description || ""
    this.cost = parseInt(data.cost || 0)
    this.baseCustomersMod = parseInt(data.baseCustomersMod || 0)
    this.priceMod = parseInt(data.priceCostMod || 0)
    this.prerequisiteEvents = (data.prerequisiteEvents?.split(",") || []).filter((x: string) => {x != ""})
    this.isRejectable = !!data.isRejectable
    this.acceptText = data.acceptText || "OK"
    this.rejectText = data.rejectText || "Pass"
  }

  hasBusinessMetConditions(
    state: AppState
  ): boolean {

    console.log("met conditions?")

    // must have all the cash required
    if (state.businessObject.stats.cash < this.cost) {
      return false
    }
    
    // must meet all prerequisites
    let allAssetIds: any = {};
    let allAssets = state.businessObject.assets.concat(state.businessObject.expiredAssets)
    allAssets.forEach(a => { allAssetIds[a.id] = true })
    for(let prerequisite in this.prerequisiteEvents) {
      if (!allAssetIds[prerequisite]) {
        return false
      }
    }

    let hasMetTriggerConditions = false
    for (let ingredient of state.drinkSpecial) {
      if (ingredient.triggeredEvents.indexOf(this.id) != -1) {
        hasMetTriggerConditions = true
      }
    }
    for (let bartender of state.selectedBartenders) {
      if (bartender.event === this.id) {
        hasMetTriggerConditions = true
      }
    }

    return hasMetTriggerConditions
    // let thresholdsMet = true
    // const thresholds: any = this.thresholds
    // const currentStats: any = business.stats
    // for(let statName in this.thresholds) {
    //   let value = thresholds[statName]
    //   if (value != 0 && value > currentStats[statName]) {
    //     thresholdsMet = false
    //   }
    // }
    // return thresholdsMet
  }

  tick(business: BusinessObject): void {
    if (this.expiryInWeeks === -1) {
      return
    }
    else {
      this.expiryInWeeks--
      if (this.expiryInWeeks <= 0) {
        const index = business.assets.indexOf(this)
        business.assets.splice(index, 1)
        business.expiredAssets.push(this)
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