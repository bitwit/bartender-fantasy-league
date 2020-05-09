import { BusinessObject } from '../BusinessObject'
import AppState from '../AppState'

export default class EventCard {
  id: string
  name: string
  expiryInWeeks: number
  description: string
  cost: number
  cash: number
  baseCustomersMod: number
  priceMod: number // price per drink sold
  prerequisiteEvents: string[]
  prerequisiteBartender: string | null
  prerequisiteIngredient: string | null
  minSeason: number
  minWeek: number
  isRejectable: boolean
  acceptText: string
  rejectText: string

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.expiryInWeeks = parseInt(data.expiryInWeeks || 1)
    this.description = data.description
    this.cost = parseInt(data.cost || 0)
    this.cash = parseInt(data.cash || 0)
    this.baseCustomersMod = parseInt(data.baseCustomersMod || 0)
    this.priceMod = parseInt(data.priceCostMod || 0)
    this.prerequisiteEvents = (data.prerequisiteEvents?.split(",") || []).filter((x: string) => {x != ""})
    this.prerequisiteBartender = data.prerequisiteBartender == "" ? null : data.prerequisiteBartender
    this.prerequisiteIngredient = data.prerequisiteIngredient == "" ? null : data.prerequisiteIngredient
    this.minSeason = parseInt(data.minSeason || 0)
    this.minWeek = parseInt(data.minWeek || 0)
    this.isRejectable = data.isRejectable === "1" ? true : false
    this.acceptText = data.acceptText == "" ? "OK" : data.acceptText
    this.rejectText = data.rejectText == "" ? "Pass" : data.rejectText
  }

  hasBusinessMetConditions(
    state: AppState
  ): boolean {

    // must have all the cash required
    if (state.businessObject.stats.cash < this.cost) {
      return false
    }

    //must meet minimum week conditions
    let weekTotal = (state.currentWeekIndex + 1) * (state.currentSeasonIndex + 1)
    if (weekTotal < this.minWeek) {
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

    let hasMetTriggerConditions = true
    if(this.prerequisiteIngredient != null) {
      hasMetTriggerConditions = false
    }
    for (let ingredient of state.drinkSpecial) {
      if (ingredient.id === this.prerequisiteIngredient) {
        hasMetTriggerConditions = true
      }
    }

    if(this.prerequisiteBartender != null) {
      hasMetTriggerConditions = false
    }
    for (let bartender of state.selectedBartenders) {
      if (bartender.id === this.prerequisiteBartender) {
        hasMetTriggerConditions = true
      }
    }

    return hasMetTriggerConditions
  }

  tick(business: BusinessObject): void {
    business.stats.cash += this.cash
    if (this.expiryInWeeks === -1) {
      return
    }
    this.expiryInWeeks--
    if (this.expiryInWeeks <= 0) {
      const index = business.assets.indexOf(this)
      business.assets.splice(index, 1)
      business.expiredAssets.push(this)
      this.onDestroy(business)
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