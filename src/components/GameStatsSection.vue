<template>
  <div class="game-stats-container">
    <div class="cash">
      <h3 :class="cashValuePositiveClass" data-glyph="dollar" class="cash-title oi">
        <br>
        <span class="title">Cash</span>
        </h3>
        <strong :class="cashValuePositiveClass" class="cash-value">{{game.stats.cash | number(0)}}</strong>
    </div>
    <div class="assets">
      <h2 data-glyph="spreadsheet" class="section-title oi"><br><span class="title">Assets</span></h2>
      <div class="assets-container">
        <ls-asset v-for="asset in game.assets" :key="asset.name" :asset="asset"></ls-asset>
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
      return parseFloat(value).toFixed(parseInt(decimals))
    }
  },
  computed: Vuex.mapState({
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
</style>