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

          <h2 class="sprint-title">
            <span class="title">{{ season.name }}&nbsp;{{week.name}}</span>
          </h2>

          <div class="bar-background">
            <div class="bar-work-area">
              <bartender-character v-for="bartender in bartenders" :key="bartender.id" :bartender="bartender" />
            </div>
          </div>

          <div class="bar-foreground"></div>
      </div>

      <div class="column right-column">
        <game-stats-section v-if="currentView == 'main'"/>
      </div>

    </div><!-- main view -->

    <div v-if="currentView != 'main'" class="modal-sections">
      <div class="modal-container">
        <intro-section v-if="currentView == 'intro'" />
        <bartender-selection-section v-if="currentView == 'bartender-selection'" />
        <drink-building-section v-if="currentView == 'drink-building'"/>
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

import IntroSection from './components/IntroSection.vue'
import BartenderSelectionSection from './components/BartenderSelectionSection.vue'
import DrinkBuildingSection from './components/DrinkBuildingSection.vue'
import GameStatsSection from './components/GameStatsSection.vue'
import EndingSection from './components/EndSection.vue'

import AnnouncementView from './components/Announcement.vue'
import AssetView from './components/Asset.vue'
import BartenderView from './components/Bartender.vue'
import BartenderCharacterView from './components/BartenderCharacter.vue'

export default Vue.extend({
  name: 'App',
  components: {
    IntroSection,
    BartenderSelectionSection,
    DrinkBuildingSection,
    GameStatsSection,
    EndingSection,

    AnnouncementView, 
    AssetView, 
    BartenderView,
    BartenderCharacterView
  },
 created: function () {
    document.addEventListener('keydown', (e) => {
      if(!e.repeat) {
        this.handleKeyDown(e.key)
      }
    })
  },
  computed: Vuex.mapState({
    announcements: function (state: AppState) { return state.announcements },
    barName: function (state: AppState) { return state.barName },
    bartenders: function(state: AppState) { return state.selectedBartenders },
    currentView: function (state: AppState) { return state.currentView },
    drinkSpecial: function(state: AppState) { return state.drinkSpecial },
    season: function (state: AppState) { 
      if(state.currentSeasonIndex == -1) {
        return state.seasons[0]
      }
      return state.seasons[state.currentSeasonIndex] 
    },
    week: function (state: AppState) { return state.weeks[state.currentWeekIndex] },

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
html { height: 100% }
body { height: 100% }

#app {
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
  width: 15%;
  background-color: rgba($color: #000000, $alpha: 0.1)
}
.center-column {
  width: 70%;
}
.right-column { 
  width: 15%;
  background-color: rgba($color: #000000, $alpha: 0.1)
}

.main-title {
  background: rgba($color: #C68E5B, $alpha: 1);
  border: 1px solid #333;
  margin: 10px;
  padding: 10px;
  font-size: 20pt;
}

.drink-special {
  color: white;
  background: #333;
  min-height: 100pt;
  font-size: 16pt;
  margin: 20px;
  padding-top: 10px;
  h4 {
    margin: 0
  }
}

.bar-background {
  margin-top: 70pt;
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

  .bartender-character {
    position: relative;
    top: -80px;
  }
}


/* line 541, style.sass */
div.modal-sections {
  position: absolute;
  z-index: 10;
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
  width: 75%;
  height: 75%;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  text-align: center;
}

</style>
