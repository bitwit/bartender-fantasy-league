<template>
  <div class="end-view view-container">
    <div class="ending">
      <h2 class="end-title">{{ending.name}}</h2>
      <span class="ending-icon"></span>
      <p class="ending-description">{{ending.endText}}</p>

      <div class="cash">
        <h3 :class="cashValuePositiveClass" class="cash-title">
          <span class="title">Final Cash</span>
        </h3>
        <strong :class="cashValuePositiveClass" class="cash-value">${{game.stats.cash | number}}</strong>
      </div>

      <h3 class="end-title">Game Over</h3>

      <button @click="restart()" class="game-start">
        <span class="title">&nbsp;Restart</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'

export default Vue.component('end-section', {
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
    ending: function (state: AppState) { return state.ending },
    cashValuePositiveClass: function (state: AppState) {
      const obj: any = {}
      obj[`positive-${state.businessObject.stats.cash > 0}`] = true
      return obj
    }
  }),
  methods: {
    restart: function () {
      window.location.reload()
    }
  }
})
</script>