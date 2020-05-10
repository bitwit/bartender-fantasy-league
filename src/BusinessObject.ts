import { shuffle, clone } from './utilities'
import VictoryCondition from './classes/VictoryCondition'
import EventCard from './classes/EventCard'
import Season from './classes/Season'
import Week from './classes/Week'
import AppState from './AppState'
import WeeklyResult from './interfaces/WeeklyResult'
import BusinessCost from './classes/BusinessCost'

class BusinessStats {
  cash: number = 0
  drinkPrice: number = 12
  costPerDrink: number = 3
  taxRate: number = 0.15
  fixedCostsPerWeek: BusinessCost[] = [
    new BusinessCost("rent", "Rent", 3_850),
    new BusinessCost("hydro", "Hydro", 1000),
    new BusinessCost("labour", "Labour", 5000),
  ]
}

export class BusinessObject {
  stats: BusinessStats = new BusinessStats()

  assets: EventCard[] = []
  expiredAssets: EventCard[] = []

  constructor() {
   
  }

  calculateBaseDemand(season: Season): number {
    let baseCustomers;
    if(season.name.indexOf("Winter") != -1) {
      baseCustomers = 370
    } else {
      baseCustomers = 550
    }
    let customersMod = 0
    for(let asset of this.assets){
      customersMod += asset.baseCustomersMod
    }
    return baseCustomers + customersMod
  }

  calculatePricePerDrink(): number {
    let priceMod = 0
    for(let asset of this.assets){
      priceMod += asset.priceMod
    }
    return this.stats.drinkPrice + priceMod
  }

  weekComplete(
    state: AppState,
    season: Season, 
    week: Week, 
    onEventOccurence: (event: EventCard) => void
    ) {

    for(let asset of this.assets) {
      asset.tick(this)
    }

    let didTriggerEvent = false
    if (state.currentWeekIndex < 25) {
      for (let event of state.events) {
        if (event.hasBusinessMetConditions(state)) {
          console.log('event triggered')
          didTriggerEvent = true
          onEventOccurence(event)
          break;
        }
      }
    }

    let baseDemand = this.calculateBaseDemand(season);

    let stats = this.stats;

    //Profits
    let playerMultiplier = state.selectedBartenders.reduce((sum, current) => { 
      return sum + current.multiplier 
    }, 0)
    let cocktailMultiplier = state.drinkMultiplier()
    let multiplier = playerMultiplier + cocktailMultiplier
    let drinksSold = baseDemand * multiplier / 10
    let revenue = (drinksSold * this.calculatePricePerDrink())

    let fixedCostTotal = 0;
    for(let cost of this.stats.fixedCostsPerWeek) {
      fixedCostTotal += cost.amount
    }
    let variableCostTotal = drinksSold * this.stats.costPerDrink

    let netProfit = ((revenue - fixedCostTotal) - variableCostTotal)

    let tax = this.stats.taxRate * netProfit
    let retainedEarnings = netProfit - tax
    stats.cash = stats.cash + retainedEarnings

    let weekHistory: WeeklyResult = {
      pricePerDrink: this.calculatePricePerDrink(),
      costPerDrink: this.stats.costPerDrink,
      drinksSold: drinksSold,
      totalRevenue: revenue,

      fixedCostTotal: fixedCostTotal,
      fixedCosts: this.stats.fixedCostsPerWeek,
      variableCostTotal: variableCostTotal,

      taxes: tax,

      retainedEarnings: retainedEarnings,
    }
    season.results.push(weekHistory)

    return {
      weekHistory: weekHistory,
      didTriggerEvent: didTriggerEvent
    }
  };

  seasonComplete(season: Season) {
    console.log('Season Complete')
  }

  processEndGame(state: AppState) {
    let validConditions: VictoryCondition[] = []
    for(let condition of state.endings) {
      if(condition.hasBusinessMetConditions(state)) {
        validConditions.push(condition)
      }
    }
    let selectedCondition = validConditions[0]
    for(let condition of validConditions) {
      if(condition.priority > selectedCondition.priority) {
        selectedCondition = condition
      }
    }
    return selectedCondition
  }

}