<template>
  <div class="bar-space">
    <div class="upper-left-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          v-for="(patron, index) in upperLeftPatrons" 
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
          v-for="(patron, index) in upperRightPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-left-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          v-for="(patron, index) in lowerLeftPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-center-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          v-for="(patron, index) in lowerCenterPatrons" 
          :key="index" 
          :index="index"/>
      </div>
    </div>
    <div class="lower-right-bar-space">
      <div v-if="currentView == 'main'">
        <patron-character 
          v-for="(patron, index) in lowerRightPatrons" 
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

export default Vue.component('bar-space', {
  data: function() { 
    return {
      upperLeftPatrons: <any[]>[
        {id: "1"},
        {id: "2"},
      ],
      upperRightPatrons: <any[]>[
        {id: "1"},
        {id: "2"},
      ],
      lowerLeftPatrons: <any[]>[
        {id: "1"},
        {id: "2"},
      ],
      lowerCenterPatrons: <any[]>[
        {id: "1"},
        {id: "2"},
        {id: "3"},
        {id: "4"},
        {id: "5"},
        {id: "6"},
      ],
      lowerRightPatrons: <any[]>[
        {id: "1"},
        {id: "2"},
      ],
    }
  },
  computed: Vuex.mapState({
    bartenders: function(state: AppState) { return state.selectedBartenders },
    currentView: function (state: AppState) { return state.currentView },
    drinkSpecial: function (state: AppState) { return state.drinkSpecial },
  }),
  methods: {
    ingredientStyles: function (index: number) {
      let ingredient = this.$store.state.drinkSpecial[index]
      return {
        'background-image': `url(./img/ingredient-${ingredient.imageId}.png)`,
      } 
    },
    patronStyles: function (index: number) {
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