import EventCard from './cards/EventCard'
import { BusinessObject } from './BusinessObject'
import VictoryCondition from './cards/VictoryCondition'
import Season from './classes/Season'
import Week from './classes/Week'
import Bartender from './classes/Bartender'
import Ingredient from './classes/Ingredient'

export class AppState {

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

  currentView = 'intro'
  announcements: EventCard[] = []
  businessObject = new BusinessObject()
  ending: VictoryCondition | null = null

  selectedBartenders = <Bartender[]>[]
  specialDrink = <Ingredient[]>[]
  currentSeasonIndex = 0
  currentWeekIndex = 0

  // Timer related
  progress = 0
  hasStarted = false
  tickSpeed = 25
  isPaused = false
  countdownProgress = 0
}