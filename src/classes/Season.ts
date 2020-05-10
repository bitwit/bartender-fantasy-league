import WeeklyResult from '../interfaces/WeeklyResult'
import EventCard from './EventCard'

export default class Season {
  id: string
  name: string
  isWinter: boolean
  results: WeeklyResult[] = []
  eventsAccepted: EventCard[] = []
  eventsRejected: EventCard[] = []

  constructor(id: string, name: string, isWinter: boolean = false) {
    this.id = id
    this.name = name
    this.isWinter = isWinter
  }
}