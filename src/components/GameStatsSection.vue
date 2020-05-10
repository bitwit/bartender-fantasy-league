<template>
  <div class="game-stats-container">
    <div class="cash">
      <h3 :class="cashValuePositiveClass" data-glyph="dollar" class="cash-title oi">
        <br>
        <span class="title">Cash</span>
        </h3>
        <strong :class="cashValuePositiveClass" class="cash-value">${{game.stats.cash | number(0)}}</strong>
    </div>
    <!-- <div class="earnings">
      <h2 class="section-title"><br><span class="title">Recent Weekly Earnings</span></h2>
      <div class="earnings-container">
        <transition-group name="asset-list" tag="div">
          <div v-for="earnings in recentEarnings" :key="earnings.id">
            {{earnings.value}}
          </div>
        </transition-group>
      </div>
    </div> -->
    <div class="assets">
      <h2 class="section-title"><br><span class="title">Assets</span></h2>
      <div class="assets-container">
        <transition-group name="asset-list" tag="div">
          <asset v-for="asset in game.assets" :key="asset.name" :asset="asset"/>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'

export default Vue.component('game-stats-section', {
  filters: {
    number: function (value: string, decimals: string) {
      if (!value) { return '' } 
      return parseFloat(value)
        .toFixed(parseInt(decimals))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  computed: Vuex.mapState({
    game: function (state: AppState) { return state.businessObject },
    recentEarnings: function (state: AppState) { 
      let allResults = state.seasons[state.currentSeasonIndex].results
      let recentEarnings = allResults.slice(3, allResults.length - 3)
      let index = allResults.length - 3
      console.log('recent earnings', recentEarnings)
      return recentEarnings.map(x => { 
        index++
        return { 
          id: index,
          value: x.retainedEarnings 
        }
      })
    },
    cashValuePositiveClass: function (state: AppState) {
      const obj: any = {}
      obj[`positive-${state.businessObject.stats.cash > 0}`] = true
      return obj
    }
  }),
})
</script>

<style lang="scss">
.asset-list-enter-active, .asset-list-leave-active {
  transition: all 1s;
}
.asset-list-enter, .asset-list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.asset {
  box-sizing: border-box;
  display: block;
  background-color: cornflowerblue;
  color: #444;
  margin: 0 auto;
  padding: 4px 8px;
  width: 90%;
  border-radius: 4px;
  .title {
    display: inline-block;
    margin: 0 3px;
  }
  .expiry {
    display: inline-block;
    margin: 0 3px;
  }
}
</style>