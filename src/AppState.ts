import EventCard from './cards/EventCard'
import { BusinessObject } from './BusinessObject'
import VictoryCondition from './cards/VictoryCondition'
import Season from './classes/Season'
import Week from './classes/Week'
import Bartender from './classes/Bartender'
import Ingredient from './classes/Ingredient'
import CSVtoJSON  from 'csvtojson'
import { httpGet } from './utilities'
import IngredientCategory from './classes/IngredientCategory'

export default class AppState {

  seasons: Season[] = [
    new Season("1", "Year 1 Season 1 - Fall/Winter"),
    new Season("2", "Year 1 Season 2 - Spring/Summer"),
    new Season("3", "Year 2 Season 1 - Fall/Winter"),
    new Season("4", "Year 2 Season 2 - Spring/Summer"),
    new Season("5", "Year 3 Season 1 - Fall/Winter"),
    new Season("6", "Year 3 Season 2 - Spring/Summer")
  ]
  weeks: Week[] = [
    new Week("1", "Week 1"),
    new Week("2", "Week 2"),
    new Week("3", "Week 3"),
    new Week("4", "Week 4"),
    //TODO: 20 more weeks for a full seaons
  ]

  bartenders = <Bartender[]>[]
  ingredientCategories = <IngredientCategory[]>[]

  currentView = 'intro'
  announcements: EventCard[] = []
  businessObject = new BusinessObject()
  ending: VictoryCondition | null = null

  // User choices
  barName: String = "Some Random Bar"
  selectedBartenders = <Bartender[]>[]
  specialDrink = <Ingredient[]>[]
  currentSeasonIndex = -1
  currentWeekIndex = 0

  // Timer related
  progress = 0
  hasStarted = false
  tickSpeed = 25
  isPaused = false
  countdownProgress = 0

  constructor() {
    console.log("loading csvs")
    /* CSV Loading */
    let bartenders = httpGet('./data/TOGAMEJAM2020 - Bartenders.csv')
    let spirits = httpGet('./data/TOGAMEJAM2020 - Ingredients (Spirits).csv')
    let garnish = httpGet('./data/TOGAMEJAM2020 - Ingredients (Garnish).csv')
    let misc = httpGet('./data/TOGAMEJAM2020 - Ingredients (Misc).csv')
    let mods = httpGet('./data/TOGAMEJAM2020 - Ingredients (Mods).csv')
    let fruit = httpGet('./data/TOGAMEJAM2020 - Ingredients (Fruit).csv')

    let csv = CSVtoJSON()
    Promise.all([
      CSVtoJSON().fromString(bartenders),
      CSVtoJSON().fromString(spirits),
      CSVtoJSON().fromString(mods),
      CSVtoJSON().fromString(fruit),
      CSVtoJSON().fromString(misc),
      CSVtoJSON().fromString(garnish),
    ])
    .then(([bartenders, spirits, garnishes, miscs, mods, fruits]) => {
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
    })

  }
}