<template>
  <div id="app">

    <div class="main-view view-container">
      <div class="column left-column">
        <!-- bar name header -->
        <h1 class="main-title">
          <span>Welcome to</span>
          <br>
          <span class="title">{{barName.split(" ").join("\n")}}</span>
        </h1>
        <!-- drink special section -->
        <div class="drink-special">
          <h4>Drink Special</h4>
          <p>{{drinkSpecial.map(x => x.name).join(", ")}}</p>
        </div>
      </div>

      <div class="column center-column">
        <bar-space />
      </div>

      <div class="column right-column">
          <h2 class="sprint-title">
            <span class="title">{{ season.name }}&nbsp;{{week.name}}</span>
          </h2>
        <game-stats-section v-if="currentView == 'main'"/>
      </div>

    </div><!-- main view -->

    <div v-if="currentView != 'main'" class="modal-sections">
      <div class="modal-container">
        <intro-section v-if="currentView == 'intro'" />
        <bartender-selection-section v-if="currentView == 'bartender-selection'" />
        <drink-building-section v-if="currentView == 'drink-building'"/>
        <season-summary-section v-if="currentView == 'season-summary'" />
        <end-section v-if="currentView == 'end'" />
      </div>
    </div>
    <div v-if="announcements.length > 0" class="announcements">
      <ls-announcement v-for="event in announcements" :key="event.name" :event="event" @accept-event="acceptEvent()" @reject-event="rejectEvent()"/>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from './AppState'
import AppStore from './AppStore'
import { debug } from './utilities'

import IntroSection from './components/IntroSection.vue'
import BartenderSelectionSection from './components/BartenderSelectionSection.vue'
import DrinkBuildingSection from './components/DrinkBuildingSection.vue'
import GameStatsSection from './components/GameStatsSection.vue'
import SeasonSummarySection from './components/SeasonSummarySection.vue'
import EndingSection from './components/EndSection.vue'

import AnnouncementView from './components/Announcement.vue'
import AssetView from './components/Asset.vue'
import BartenderView from './components/Bartender.vue'
import BartenderCharacterView from './components/BartenderCharacter.vue'
import PatronCharacterView from './components/PatronCharacter.vue'
import BarSpaceView from './components/BarSpace.vue'

export default Vue.extend({
  name: 'App',
  components: {
    IntroSection,
    BartenderSelectionSection,
    DrinkBuildingSection,
    GameStatsSection,
    SeasonSummarySection,
    EndingSection,

    AnnouncementView, 
    AssetView, 
    BartenderView,
    BartenderCharacterView,
    PatronCharacterView,
    BarSpaceView
  },
 created: function () {
    document.addEventListener('keydown', (e) => {
      if(!e.repeat) {
        this.handleKeyDown(e.key)
      }
    })
    debug.superSpeed = () => {
      this.$store.commit('superSpeedMode')
    }
    debug.singleSeason = () => {
      this.$store.commit('singleSeason')
    }
    debug.showMeTheMoney = (amount: number) => {
      this.$store.commit('addCash', amount)
    }
    debug.addIngredient = (ingredient: string) => {
      this.$store.commit('addIngredient', ingredient)
    }
    debug.triggerEvent = (name: string) => {
      this.$store.commit('triggerEvent', name)
    }
  },
  computed: Vuex.mapState({
    announcements: function (state: AppState) { return state.announcements },
    barName: function (state: AppState) { return state.barName },
    currentView: function (state: AppState) { return state.currentView },
    drinkSpecial: function(state: AppState) { return state.drinkSpecial },
    season: function (state: AppState) { 
      if(state.currentSeasonIndex == -1) {
        return state.seasons[0]
      }
      return state.seasons[state.currentSeasonIndex] 
    },
    week: function (state: AppState) { 
      console.log('week index', state.currentWeekIndex)
      return state.weeks[state.currentWeekIndex] 
    },
    countdownProgress: function (state: AppState) { return state.countdownProgress },
    progress: function (state: AppState) { return state.progress },
  }),
  methods: {
    switchView: function (viewName: string) {
      this.$store.commit('switchView', viewName)
    },

    handleKeyDown: function (key: string) {
      // console.log('keydown happened', key)
      switch (key) {
        case "Escape":
          this.rejectEvent()
          break
        case " ":
          this.acceptEvent()
          break
      }
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
$browser-context: 16; // Default

@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

html { height: 100% }
body { height: 100% }

@font-face {
  font-family: 'ComicPapyrus';
  src: url("../public/fonts/ComicPapyrus.ttf") format("truetype");
  font-weight: normal;
  font-style: normal; }

#app {
  font-size: em(16);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.main-view {
  display: flex;
  height: 100%;
}
.column {
  position: relative;
  height: 100%;
}
.left-column {
  z-index: 8888;
  width: 15%;
  background-color: rgba($color: #888, $alpha: 0.3)
}
.center-column {
  width: 70%;
}
.right-column { 
  z-index: 8888;
  width: 15%;
  background-color: rgba($color: #888, $alpha: 0.3)
}

.main-title {
  background: rgba($color: #C68E5B, $alpha: 1);
  border: em(1) solid #333;
  margin: em(10);
  padding: em(10);
  font-size: em(20);
}

.drink-special {
  font-family: 'ComicPapyrus';
  box-sizing: border-box;
  color: white;
  background: #333;
  min-height: em(100);
  font-size: em(16);
  margin: em(20);
  padding: em(10);
  h4 {
    margin: 0
  }
}

/* line 541, style.sass */
div.modal-sections {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0; 
}

/* line 553, style.sass */
div.modal-container {
  box-sizing: border-box;
  margin: 2% auto 0;
  border-width: 0.625em;
  border-style: solid;
  padding: 0 2.5em;
  width: 66%;
  height: 75%;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (max-width: 1024px) {
  .column {
    font-size: em(10);
  }
}

</style>
