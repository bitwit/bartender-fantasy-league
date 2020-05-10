<template>
  <div class="bar-space">
    <div class="upper-left-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          :mood="patron.mood"
          v-for="(patron, index) in patronDistribution.upperLeftPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="main-bar-space">
      <div class="bar-background">
        <div class="bar-work-area" v-if="currentView != 'season-summary'">
          <bartender-character v-for="bartender in bartenders" :key="bartender.id" :bartender="bartender" />
        </div>
      </div>
      <div class="bar-foreground">
        <div class="ingredients-area">
          <div 
            class="bar-ingredient" 
            :style="ingredientStyles(index)"
            v-for="(ingredient, index) in drinkSpecial" 
            :ingredient="ingredient" 
            :key="ingredient.id"></div>
        </div>
      </div>
    </div>
    <div class="upper-right-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          :mood="patron.mood"
          v-for="(patron, index) in patronDistribution.upperRightPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-left-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          :mood="patron.mood"
          v-for="(patron, index) in patronDistribution.lowerLeftPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-center-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          :mood="patron.mood"
          v-for="(patron, index) in patronDistribution.lowerCenterPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-right-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          :mood="patron.mood"
          v-for="(patron, index) in patronDistribution.lowerRightPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'
import Mood from '../enums/Mood'

interface Chances {
  happy: number
  sad: number
  party: number
  drunk: number
}

function makePatrons(count: number, chances: Chances): any[] {
  let patrons: any[] = []
  let mood = "neutral"
  if (Math.random() < chances.happy) { mood = Mood.Happy }
  if (Math.random() < chances.sad) { mood = Mood.Sad }

  for(let i = 0; i < count; i++) {
    patrons.push({ 
      id: "${index}",
      mood: mood
    })
  }
  return patrons
}

export default Vue.component('bar-space', {
  computed: Vuex.mapState({
    bartenders: function(state: AppState) { return state.selectedBartenders },
    currentView: function (state: AppState) { return state.currentView },
    drinkSpecial: function (state: AppState) { return state.drinkSpecial },
    patronDistribution: function(state: AppState) {
      let basePatrons = 2
      let drinkPatrons = state.drinkRating() * 3
      let eventPatrons = 0
      for(let event of state.businessObject.assets) {
        eventPatrons += event.baseCustomersMod
      }
      let totalPatrons = basePatrons + drinkPatrons + eventPatrons
      totalPatrons = Math.min(Math.max(1, totalPatrons), 20)
      let chances: Chances = {
        happy: (0.5) + (state.drinkRating() / 10), //perfect rating means everyoen happy
        sad: (0.5) - (state.drinkRating() / 10), //perfect rating means noone is sad
        party: 0.1,
        drunk: 0.4
      }
      return {
        upperLeftPatrons: makePatrons(Math.floor(totalPatrons / 10), chances),
        upperRightPatrons: makePatrons(Math.floor(totalPatrons / 10), chances),
        lowerLeftPatrons: makePatrons(Math.floor(totalPatrons / 10), chances),
        lowerCenterPatrons: makePatrons(Math.ceil(totalPatrons / 2), chances),
        lowerRightPatrons: makePatrons(Math.floor(totalPatrons / 10), chances),
      }
    }
  }),
  methods: {
    ingredientStyles: function (index: number) {
      let ingredient = this.$store.state.drinkSpecial[index]
      return {
        'background-image': `url(./img/ingredient-${ingredient.imageId}.png)`,
      } 
    },
    patronStyles: function (index: number, mood: string) {
      return {
        top: `${Math.random() * 100}px`,
        left: `${index * 120}px`,
      }
    }
  }
})
</script>

<style lang="scss">
.bar-space {
  display: flex;
  flex-wrap: wrap;
   .upper-left-bar-space {
     position: relative;
     flex-basis: 15%;
   }
   .main-bar-space {
     position: relative;
     flex-basis: 70%;
   }
   .upper-right-bar-space {
     position: relative;
     z-index: 11;
     left: -80px;
     flex-basis: 15%;
   }
   .lower-left-bar-space {
     position: relative;
     flex-basis: 15%;
   }
   .lower-center-bar-space {
     position: relative;
     z-index: 11;
     top: -100px;
     display: flex;
     flex-basis: 70%;
   }
   .lower-right-bar-space {
      position: relative;
      z-index: 11;
      left: -80px;
      position: relative;
      flex-basis: 15%; 
   }
}

.bar-background {
  margin-top: 70pt;
  background: url(../../public/img/bar-background.png) no-repeat;
  width: 758px;
  height: 104px;
}
.bar-foreground {
  background: url(../../public/img/bar-foreground.png) no-repeat;
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

.ingredients-area {
  margin: 0 auto;
  width: 30%;
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -60px;
}

.bar-ingredient {
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-position: bottom;
  width: 80pt;
  height: 80pt;
  margin: 0 auto 20px;
}

</style>