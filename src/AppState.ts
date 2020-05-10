import EventCard from './classes/EventCard'
import { BusinessObject } from './BusinessObject'
import VictoryCondition from './classes/VictoryCondition'
import Season from './classes/Season'
import Week from './classes/Week'
import Bartender from './classes/Bartender'
import Ingredient from './classes/Ingredient'
import CSVtoJSON  from 'csvtojson'
import { httpGet } from './utilities'
import IngredientCategory from './classes/IngredientCategory'

export default class AppState {

  seasons: Season[] = [
    new Season("1", "Year 1 Season 1 - Fall/Winter", true),
    new Season("2", "Year 1 Season 2 - Spring/Summer"),
    new Season("3", "Year 2 Season 1 - Fall/Winter", true),
    new Season("4", "Year 2 Season 2 - Spring/Summer"),
    new Season("5", "Year 3 Season 1 - Fall/Winter", true),
    new Season("6", "Year 3 Season 2 - Spring/Summer")
  ]
  weeks: Week[] = []

  bartenders: Bartender[] = []
  ingredientCategories: IngredientCategory[] = []
  events: EventCard[] = []
  endings: VictoryCondition[] = []

  currentView = 'intro'
  announcements: EventCard[] = []
  businessObject = new BusinessObject()
  ending: VictoryCondition | null = null

  // User choices
  barName: String = "Some Random Bar"
  selectedBartenders = <Bartender[]>[]
  drinkSpecial = <Ingredient[]>[]
  currentSeasonIndex = -1
  currentWeekIndex = 0

  // Timer related
  progress: number = 0
  progressInterval: number = 0.2
  tickSpeed: number = 30
  isPaused: boolean = false
  countdownProgress: number = 0

  constructor() {
    this.populateWeeks()

    /* CSV Loading */
    let bartenders = httpGet('./data/TOGAMEJAM2020 - Bartenders.csv')
    let events = httpGet('./data/TOGAMEJAM2020 - Events.csv')
    let endings = httpGet('./data/TOGAMEJAM2020 - GameEndings.csv')
    let spirits = httpGet('./data/TOGAMEJAM2020 - Ingredients (Spirits).csv')
    let garnish = httpGet('./data/TOGAMEJAM2020 - Ingredients (Garnish).csv')
    let misc = httpGet('./data/TOGAMEJAM2020 - Ingredients (Misc).csv')
    let mods = httpGet('./data/TOGAMEJAM2020 - Ingredients (Mods).csv')
    let fruit = httpGet('./data/TOGAMEJAM2020 - Ingredients (Fruit).csv')

    Promise.all([
      CSVtoJSON().fromString(bartenders),
      CSVtoJSON().fromString(events),
      CSVtoJSON().fromString(endings),
      CSVtoJSON().fromString(spirits),
      CSVtoJSON().fromString(mods),
      CSVtoJSON().fromString(fruit),
      CSVtoJSON().fromString(misc),
      CSVtoJSON().fromString(garnish),
    ])
    .then(([bartenders, events, endings, spirits, mods, fruits, miscs, garnishes]) => {
      this.ingredientCategories = [
        new IngredientCategory("spirits", "Spirits", spirits),
        new IngredientCategory("mods", "Mods", mods),
        new IngredientCategory("fruit", "Fruit", fruits),
        new IngredientCategory("misc", "misc", miscs),
        new IngredientCategory("garnish", "Garnish", garnishes),
      ]

      for(let data of bartenders) {
        this.bartenders.push(new Bartender(data))
      }

      let cleanEvents = events.filter((x:any) => { return x.id != "" })
      for(let data of cleanEvents) {
        this.events.push(new EventCard(data))
      }

      let cleanEndings = endings.filter((x:any) => { return x.id != "" })
      for(let data of cleanEndings) {
        this.endings.push(new VictoryCondition(data))
      }
    })
  }

  populateWeeks() {
    for(let i = 1; i <= 26; i++) {
      this.weeks.push(new Week(`${i}`, `Week ${i}`))
    }
  }

  drinkRating() {
    let rating = 3
    let season = this.seasons[this.currentSeasonIndex]
    this.drinkSpecial.forEach((current) => {
      let isWinterIngredient = current.valueWinter > current.valueSummer
      if (season.isWinter && isWinterIngredient) {
        rating += 1
      }
      for(let ingredient of this.drinkSpecial) {
        if (findCommonElement(ingredient.badMixProperties, current.mixProperties)) {
          rating -= 1
          console.log(`${ingredient.name} and ${current.name} don't mix well`)
        }
      }
    })
    if (rating > 5) { rating = 5 }
    else if (rating < 1) { rating = 1 }
    return rating
  }

  drinkMultiplier(): number {
    let season = this.seasons[this.currentSeasonIndex]
    return this.drinkSpecial.reduce((sum, current) => {
      let value = season.isWinter ? current.valueWinter : current.valueSummer
      for(let ingredient of this.drinkSpecial) {
        if (findCommonElement(ingredient.badMixProperties, current.mixProperties)) {
          value = 1
          console.log(`${ingredient.name} and ${current.name} don't mix well`)
        }
      }
      return sum + value
    }, 0)
  }
}

function findCommonElement<T>(array1: T[], array2: T[]): boolean { 
  // Loop for array1 
  for(let i = 0; i < array1.length; i++) { 
        
      // Loop for array2 
      for(let j = 0; j < array2.length; j++) { 
            
          // Compare the element of each and 
          // every element from both of the 
          // arrays 
          if(array1[i] === array2[j]) { 
            
              // Return if common element found 
              return true; 
          } 
      } 
  } 
  // Return if no common element exist 
  return false;  
} 