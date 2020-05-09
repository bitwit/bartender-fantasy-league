<template>
  <div class="main-view view-container">
    <div class="column left-column">
      <h1 data-glyph="droplet" class="main-title oi">
        <br>
        <span class="title">{{barName.split(" ").join("\n")}}</span>
      </h1>
      <h4>Drink Special</h4>
      <p>{{drinkSpecial.map(x => x.name).join(", ")}}</p>
    </div>

    <div class="column center-column">
      <div class="days">
        <h2 class="sprint-title">
          <span class="title">{{ season.name }}&nbsp;{{week.name}}</span>
          <span v-if="countdownProgress &gt; 0">&nbsp;starts in {{countdownProgress/1000 | number(2)}}s</span>
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

    <div class="column right-column">
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

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'

export default Vue.component('main-section', {
  filters: {
    number: function (value: string, decimals: string) {
      if (!value) { return '' } 
      return parseFloat(value).toFixed(parseInt(decimals))
    }
  },
  computed: Vuex.mapState({
    barName: function (state: AppState) { return state.barName },
    bartenders: function(state: AppState) { return state.selectedBartenders },
    drinkSpecial: function(state: AppState) { return state.drinkSpecial },

    season: function (state: AppState) { return state.seasons[state.currentSeasonIndex] },
    week: function (state: AppState) { return state.weeks[state.currentWeekIndex] },

    countdownProgress: function (state: AppState) { return state.countdownProgress },
    progress: function (state: AppState) { return state.progress },

    game: function (state: AppState) { return state.businessObject },

    cashValuePositiveClass: function (state: AppState) {
      const obj: any = {}
      obj[`positive-${state.businessObject.stats.cash > 0}`] = true
      return obj
    }
  }),
})
</script>

<style lang="scss">
.main-view {
  display: flex;
  height: 100%;
}
.column {
  position: relative;
  height: 100%;
}
.left-column {
  width: 10%;
  background-color: rgba($color: #000000, $alpha: 0.1)
}
.center-column {
  width: 80%;
}
.right-column { 
  width: 10%;
  background-color: rgba($color: #000000, $alpha: 0.1)
}
</style>