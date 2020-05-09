import { shuffle, clone } from './utilities'
import VictoryCondition from './classes/VictoryCondition'
import EventCard from './classes/EventCard'
import Season from './classes/Season'
import Week from './classes/Week'
import AppState from './AppState'

class BusinessCost {
  id: string
  name: string
  amount: number
  constructor(id: string, name: string, amount: number) {
    this.id = id
    this.name = name
    this.amount = amount
  }
}

class BusinessStats {
  cash: number = 50
  drinkPrice: number = 12
  fixedCostsPerWeek: BusinessCost[] = [
    new BusinessCost("rent", "Rent", 3_850),
    new BusinessCost("hydro", "Hydro", 1000),
    new BusinessCost("labour", "Labour", 5000),
  ]
  //todo: variable costs???
}

class BusinessFlags {
  isInBusiness: boolean = true
}

export class BusinessObject {
  stats: BusinessStats = new BusinessStats()
  flags: BusinessFlags = new BusinessFlags()

  assets: EventCard[] = []
  expiredAssets: EventCard[] = []
  weeklyHistory: any[] = []
  seasonRevenueHistory: any[] = []

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

  calculatePrice(): number {
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
    for (let event of state.events) {
      if (event.hasBusinessMetConditions(state)) {
        console.log('event triggered')
        didTriggerEvent = true
        onEventOccurence(event)
        break;
      }
    }

    let baseDemand = this.calculateBaseDemand(season);

    let stats = this.stats;
    let cashDelta = 0;
    let fixedCostTotal = 0;

    for(let cost of this.stats.fixedCostsPerWeek) {
      cashDelta -= cost.amount
      fixedCostTotal += cost.amount
    }
    //todo: variable costs
    // if (stats.variableCostPerWeek > 0) {
    //   cashDelta -= numCustomers * stats.fixedCostPerWeek;
    // }

    let playerMultiplier = state.bartenders.reduce((sum, current) => { 
      return sum + current.multiplier 
    }, 0)
    let cocktailMultiplier = state.drinkSpecial.reduce((sum, current) => { 
      let value = season.isWinter ? current.valueWinter : current.valueSummer
      return sum + value
    }, 0)
    let multiplier = playerMultiplier + cocktailMultiplier
    let drinksSold = baseDemand * multiplier
    
    cashDelta += drinksSold * this.calculatePrice()
    stats.cash = stats.cash + cashDelta;

    console.log({playerMultiplier, cocktailMultiplier, drinksSold, cashDelta, baseDemand, fixedCostTotal})

    let weekHistory = {
      cashDelta: cashDelta,
      drinksSold: drinksSold
    }
    this.weeklyHistory.push(weekHistory);

    return {
      weekHistory: weekHistory,
      didTriggerEvent: didTriggerEvent
    }
  };

  seasonComplete(season: Season) {
    // this.setCosts(sprintNumber);
    // return this.setCreditLimit();
  }

  processEndGame() {
    return new VictoryCondition("The End", "test-end", "ico")
    // let validConditions: VictoryCondition[] = []
    // for(let condition of victoryConditions) {
    //   if(condition.hasBusinessMetConditions(this)) {
    //     validConditions.push(condition)
    //   }
    // }
    // let selectedCondition = validConditions[0]
    // for(let condition of validConditions) {
    //   if(condition.priority > selectedCondition.priority) {
    //     selectedCondition = condition
    //   }
    // }
    // return selectedCondition
  }

}