import { shuffle, clone } from './utilities'
import VictoryCondition from './cards/VictoryCondition'
import EventCard from './cards/EventCard'
import Season from './classes/Season'
import Week from './classes/Week'

const victoryConditions: VictoryCondition[] = [
]

const eventCards: EventCard[] = [
]

class BusinessStats {
  cash: number = 50
  potentialMarketSize: number = 100
  seasonalRelevance: number = 100

  researchDevelopment: number = 100
  design: number = 0
  marketing: number = 0
  sales: number = 0

  fixedCostPerWeek: number = 5
  variableCostPerWeek: number = 0.20
  averageDemand: number = 20
}

class BusinessFlags {
  isInBusiness: boolean = true
}

export class BusinessObject {
  stats: BusinessStats = new BusinessStats()
  flags: BusinessFlags = new BusinessFlags()

  assets: EventCard[] = []
  forecast: any[] = []
  businessHistory: any[] = []
  weeklyRevenueHistory: any[] = []
  seasonRevenueHistory: any[] = []

  constructor() {
   
  }

  calculateDemand(season: Season, week: Week): number {
    let demand = this.stats.averageDemand
    let ratio: number = 1
    demand *= ratio
    return demand
  }

  weekComplete(season: Season, week: Week, onEventOccurence: (event: EventCard) => void) {

    for(let asset of this.assets) {
      asset.tick(this)
    }

    let didTriggerEvent = false
    for (let eventCard of eventCards) {
      if (eventCard.hasBusinessMetConditions(this)) {
        didTriggerEvent = true
        let event = eventCards.splice(eventCards.indexOf(eventCard), 1)[0];
        onEventOccurence(event)
        break;
      }
    }

    let numCustomers = this.calculateDemand(season, week);
    if (numCustomers > this.stats.potentialMarketSize) {
      numCustomers = this.stats.potentialMarketSize;
    }

    let stats = this.stats;
    let cashDelta = 0;
    if (stats.fixedCostPerWeek > 0) {
      cashDelta -= stats.fixedCostPerWeek;
    }
    if (stats.variableCostPerWeek > 0) {
      cashDelta -= numCustomers * stats.fixedCostPerWeek;
    }
    
    cashDelta += numCustomers * 10; //TODO: set price stuff
    stats.cash = stats.cash + cashDelta;
    this.weeklyRevenueHistory.push(cashDelta);

    let weekHistory = {
      cashDelta: cashDelta,
      customerCount: numCustomers
    }
    this.businessHistory.push(weekHistory);

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
    let validConditions: VictoryCondition[] = []
    for(let condition of victoryConditions) {
      if(condition.hasBusinessMetConditions(this)) {
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