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
  hidesModHints: boolean
  priceMod: number // price per drink sold
  prerequisiteEvents: string[]
  prerequisiteBartender: string | null
  prerequisiteIngredient: string | null
  minWeek: number
  removeBartender: string | null
  removeIngredient: string | null
  forcesEnding: boolean  

  acceptanceFlags: string[]
  rejectionFlags: string[]
  prerequisiteFlags: string[]

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
    this.hidesModHints = data.hidesModHints === "1" ? true : false
    this.prerequisiteEvents = data.prerequisiteEvents.split(",").filter((x: string) => { return x != ""})
    this.prerequisiteBartender = data.prerequisiteBartender == "" ? null : data.prerequisiteBartender
    this.prerequisiteIngredient = data.prerequisiteIngredient == "" ? null : data.prerequisiteIngredient
    this.minWeek = parseInt(data.minWeek || 0)
    this.removeBartender = data.removeBartender == "" ? null : data.removeBartender
    this.removeIngredient = data.removeIngredient == "" ? null : data.removeIngredient
    this.forcesEnding = data.forcesEnding === "1" ? true : false

    this.acceptanceFlags = data.acceptanceFlags.split(",").filter((x: string) => { return x != ""})
    this.rejectionFlags = data.rejectionFlags.split(",").filter((x: string) => { return x != ""})
    this.prerequisiteFlags = data.prerequisiteFlags.split(",").filter((x: string) => { return x != ""})

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
    for(let prerequisite of this.prerequisiteEvents) {
      if (!allAssetIds[prerequisite]) {
        return false
      }
    }

    for(let flag of this.prerequisiteFlags) {
      if(state.businessObject.eventFlags.indexOf(flag) === -1) {
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

  onAccept(state: AppState) {
    state.businessObject.stats.cash += this.cash
    this.acceptanceFlags.forEach(x => {
      state.businessObject.eventFlags.push(x)
    })
    if (this.removeBartender) {
      let ids = state.selectedBartenders.map(x => { return x.id })
      let index = ids.indexOf(this.removeBartender)
      if( index !== -1) {
        state.selectedBartenders.splice(index, 1)
      }
    }
    if (this.removeIngredient) {
      let ids = state.drinkSpecial.map(x => { return x.id })
      let index = ids.indexOf(this.removeIngredient)
      if( index !== -1) {
        state.drinkSpecial.splice(index, 1)
      }
    }
    if (this.forcesEnding) {
      state.businessObject.flags.isFired = true
    }
  }

  onReject(state: AppState) {
    this.rejectionFlags.forEach(x => {
      state.businessObject.eventFlags.push(x)
    })
  }

  onDestroy(business: BusinessObject) {

  }

}