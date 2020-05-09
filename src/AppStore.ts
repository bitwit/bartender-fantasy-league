import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import Season from './classes/Season'
import EventCard from './cards/EventCard'
import Bartender from './classes/Bartender'
import Ingredient from './classes/Ingredient'

Vue.use(Vuex)

export default new Vuex.Store({
  state: new AppState(),
  
  mutations: {
    resetCountdown: function (state: AppState) {
      state.countdownProgress = 10000 
    },
    clearAnnouncements: function (state: AppState) {
      state.announcements.length = 0
    },
    switchView: function (state: AppState, newView: string) {
      state.currentView = newView
    },
    prepareForNextSeason: function (state: AppState) {
      state.currentView = 'drink-building'
    },
    nextSeason: function (state: AppState) {
      console.log('incrementing season, before>', state.currentSeasonIndex)
      state.currentSeasonIndex++
      state.currentWeekIndex = 0
      state.progress = 0
      for(let week of state.weeks) {
        week.result = null
      }
    },
    tickCountdown: function (state: AppState) {
      state.countdownProgress -= state.tickSpeed
      if(state.countdownProgress <= 0) {
        state.countdownProgress = 0
      }
    },
    tick: function (state: AppState) {
      state.progress += 0.1
      let didCompleteWeek = false
      if(state.progress > 10) {
        didCompleteWeek = true
        const season = state.seasons[state.currentSeasonIndex]
        const week = state.weeks[state.currentWeekIndex]
        const result = state.businessObject.weekComplete(
          season,
          week,
          (event: EventCard) => {
            state.announcements.length = 0
            state.announcements.push(event)
          }
        )
        week.result = result.weekHistory
        state.isPaused = result.didTriggerEvent
        state.progress = 0.1
        state.currentWeekIndex++
      }

      // Did season complete?
      if(state.currentWeekIndex >= state.weeks.length) {
        const season = state.seasons[state.currentSeasonIndex]
        state.businessObject.seasonComplete(season)
      }
      else if(didCompleteWeek) {
        const week = state.weeks[state.currentWeekIndex]
        // const newPrice = state.prices[state.price]
        // day.price = newPrice
        // day.isInteractive = false
      } else {
        // just a mid-week tick, nothing else
      }
    },

    unpause: function (state: AppState) {
      state.isPaused = false
    },

    setBarName: function(state: AppState, barName: string) {
      state.barName = barName
    },

    setBartendersSelection: function (state: AppState, bartenders: Bartender[]) {
      state.selectedBartenders = bartenders
    },

    setSpecialDrink: function (state: AppState, drink: Ingredient[]) {
      state.specialDrink = drink
    },
    
    acceptFirstEvent: function (state: AppState) {
      const event = state.announcements.shift()
      if(!event) { return }
      event.onAccept(state.businessObject)
      state.businessObject.assets.unshift(event) // Add it to our current assets
    },

    rejectFirstEvent: function (state: AppState) {
      const event = state.announcements.shift()
      event?.onReject(state.businessObject)
    },

    processEndGame: function (state: AppState) {
      const endResult = state.businessObject.processEndGame()
      state.ending = endResult
      state.currentView = 'end'
    }

  },
      
  actions: {
    startCountdown: function (context) {
      context.commit('resetCountdown')
      context.dispatch('tickCountdown')
    },

    tickCountdown: function (context) {
      context.commit('tickCountdown')
      if(context.state.countdownProgress <= 0) {
        context.dispatch('startSimulation')
      }
      else {
        setTimeout(() => {
          context.dispatch('tickCountdown')
        }, context.state.tickSpeed)
      }
    },

    startSimulation: function (context) {
      console.log("start simulation")
      context.dispatch('tick')
    },

    tick: function (context) {
      context.commit('tick')
      if(context.state.currentWeekIndex >= context.state.weeks.length) {
        if( context.state.currentSeasonIndex >= context.state.seasons.length) {
          context.commit('processEndGame')
        } else {
          context.commit('prepareForNextSeason')
        }
      } else if(!context.state.isPaused) {
        setTimeout(() => {
          context.dispatch('tick')
        }, context.state.tickSpeed)
      }
    },

    acceptEvent: function (context) {
      context.commit('acceptFirstEvent')
      context.dispatch('resumeSimulation')
    },

    rejectEvent: function (context) {
      context.commit('rejectFirstEvent')
      context.dispatch('resumeSimulation')
    },

    resumeSimulation: function (context) {
      if(context.state.hasStarted) {
        context.commit('clearAnnouncements')
        context.commit('unpause')
        context.dispatch('tick')
      }
    },
    nextSeason: function (context) {
      context.commit('nextSeason')
      context.dispatch('startCountdown')
    }
  }
})


