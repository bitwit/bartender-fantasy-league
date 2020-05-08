<template>
  <div id="app">
      <intro-section v-if="currentView == 'intro'" />
      <bartender-selection-section v-if="currentView == 'bartender-selection'" />
      <drink-building-section v-if="currentView == 'drink-building'"/>
      <end-section v-if="currentView == 'end'" />

      <div v-if="currentView == 'main'" class="main-view view-container">
        <div class="tasks-column">
          <h1 data-glyph="droplet" class="main-title oi">
            <br>
            <span class="title">Bartender<br/>Fantasy<br/>League</span>
          </h1>
        </div>

        <div class="main-column">
          <div class="days">
            <h2 class="sprint-title"><span class="title">{{ season.name }}</span>
              <span v-if="countdownProgress &gt; 0" class="countdown">&nbsp;starts in {{countdownProgress/1000 | number(2)}}s</span>
            </h2>

            <div class="bar-background">
              <div class="bar-work-area">
                <div class="bartender" v-for="bartender in bartenders" :key="bartender.id">
                  <h5>{{bartender.name}}</h5>
                </div>
              </div>
            </div>
            <div class="bar-foreground"></div>
            
          </div>
        </div>

        <div class="status-column">
          <div class="cash">
            <h3 :class="cashValuePositiveClass" data-glyph="dollar" class="cash-title oi"><br><span class="title">Cash</span></h3><strong :class="cashValuePositiveClass" class="cash-value">{{game.stats.cash | number(0)}}</strong>
          </div>
          <div class="assets">
            <h2 data-glyph="spreadsheet" class="section-title oi"><br><span class="title">Assets</span></h2>
            <div class="assets-container">
              <ls-asset v-for="asset in game.assets" :key="asset.name" :asset="asset"></ls-asset>
            </div>
          </div>
        </div>

        <div v-if="announcements.length &gt; 0" class="announcements">
          <ls-announcement v-for="event in announcements" :key="event.name" :event="event" @accept-event="acceptEvent()" @reject-event="rejectEvent()"></ls-announcement>
        </div>

      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import { AppState } from './State'
import AppStore from './AppStore'

import IntroSection from './components/IntroSection.vue'
import BartenderSelectionSection from './components/BartenderSelectionSection.vue'
import DrinkBuildingSection from './components/DrinkBuildingSection.vue'
import EndingSection from './components/EndSection.vue'

import AnnouncementView from './components/Announcement.vue'
import AssetView from './components/Asset.vue'
import BartenderView from './components/Bartender.vue'

export default Vue.extend({
  name: 'App',
  components: {
    IntroSection,
    EndingSection,
    BartenderSelectionSection,
    DrinkBuildingSection ,

    AnnouncementView, 
    AssetView, 
    BartenderView
  },
 created: function () {
    document.addEventListener('keydown', (e) => {
      if(!e.repeat) {
        this.handleKeyDown(e.key)
      }
    })
  },
  filters: {
    number: function (value: string, decimals: string) {
      if (!value) { return '' } 
      return parseFloat(value).toFixed(parseInt(decimals))
    }
  },
  computed: Vuex.mapState({
    season: function (state: AppState) { return state.seasons[state.currentSeasonIndex] },
    bartenders: function(state: AppState) { return state.selectedBartenders },
    specialDrink: function(state: AppState) { return state.specialDrink },

    currentView: function (state: AppState) { return state.currentView },
    countdownProgress: function (state: AppState) { return state.countdownProgress },
    progress: function (state: AppState) { return state.progress },
    game: function (state: AppState) { return state.businessObject },
    announcements: function (state: AppState) { return state.announcements },
    ending: function (state: AppState) { return state.ending },

    cashValuePositiveClass: function (state: AppState) {
      const obj: any = {}
      obj[`positive-${state.businessObject.stats.cash > 0}`] = true
      return obj
    }

  }),
  methods: {

    switchView: function (viewName: string) {
      this.$store.commit('switchView', viewName)
    },

    handleKeyDown: function (key: string) {
      // console.log('keydown happened', key)
      switch (key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
          this.$store.commit('setSelectedTaskIndex', (parseInt(key) - 1))
          break
        case "Escape":
          this.rejectEvent()
          break
        case " ":
          this.acceptEvent()
          break
      }
    },

    priceChanged: function (event: any) {
      const price: string | null = event?.srcElement?.value
      this.$store.commit('updatePrice', price)
    },

    acceptEvent: function () {
      this.$store.dispatch('acceptEvent')
    },

    rejectEvent: function () {
      this.$store.dispatch('rejectEvent')
    },
  }

});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bar-background {
  margin-top: 20pt;
  background: url(../public/img/bar-background.png) no-repeat;
  width: 758px;
  height: 104px;
}

.bar-foreground {
  background: url(../public/img/bar-foreground.png) no-repeat;
  width: 758px;
  height: 173px;

  position: relative;
  z-index: 10;
}

.bar-work-area {
  margin: 0 22%;
  display: flex;
  justify-content: space-around;
}
</style>
