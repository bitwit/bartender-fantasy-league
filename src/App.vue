<template>
  <div id="app">
      <intro-section v-if="currentView == 'intro'" />
      <bartender-selection-section v-if="currentView == 'bartender-selection'" />
      <drink-building-section v-if="currentView == 'drink-building'"/>
      <main-section v-if="currentView == 'main'"/>
      <end-section v-if="currentView == 'end'" />
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
import MainSection from './components/MainSection.vue'
import EndingSection from './components/EndSection.vue'

import AnnouncementView from './components/Announcement.vue'
import AssetView from './components/Asset.vue'
import BartenderView from './components/Bartender.vue'

export default Vue.extend({
  name: 'App',
  components: {
    IntroSection,
    BartenderSelectionSection,
    DrinkBuildingSection,
    MainSection,
    EndingSection,

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
  computed: Vuex.mapState({
    currentView: function (state: AppState) { return state.currentView },
    announcements: function (state: AppState) { return state.announcements }
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
