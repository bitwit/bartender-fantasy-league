import { BusinessObject } from "../BusinessObject"
import AppState from '@/AppState'

export default class VictoryCondition {
  id: string
  name: string

  minimumCash: number
  minimumCustomersServed: number
  requiredEvents: string[]

  endText: string = "An event occurred"
  priority: number = 0

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.minimumCash = parseInt(data.minimumCash) || 0
    this.minimumCustomersServed = parseInt(data.minimumCustomersServed) || 0
    this.requiredEvents = data.requiredEvents.split(",").filter((x: string) => { return x != ""})
    this.endText = data.endText
    this.priority = parseInt(data.priority) || 0
  }

  hasBusinessMetConditions(state: AppState) {
    // must meet all event requirements
    let allAssetIds: any = {};
    let allAssets = state.businessObject.assets.concat(state.businessObject.expiredAssets)
    allAssets.forEach(a => { allAssetIds[a.id] = true })
    for (let requiredEvent of this.requiredEvents) {
      if (!allAssetIds[requiredEvent]) {
        return false
      }
    }

    if (this.minimumCash > 0) {
      return state.businessObject.stats.cash >= this.minimumCash
    }
    
    return true
  }

}
