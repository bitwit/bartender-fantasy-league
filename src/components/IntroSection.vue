<template>
  <div class="intro-view view-container">
    <h1 class="intro-title">
      <br>Running {{finalBarName}} for 3 years
      <br>
      <br>Prove yourself
      <br>
      <br>Don't make the owner angry
    </h1>
    <label for="barName">Name your bar</label>
    <input type="text" v-model="barName" name="barName"/>

    <button @click="newGame()" class="game-start">
      <span class="title">Let's do this</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
export default Vue.component('intro-section', {
  data: function () {
    return {
      barName: ""
    }
  },
  computed: Vuex.mapState({
    finalBarName: function () {
      return this.barName.length == 0 ? "a bar" : this.barName
    }
  }),
  methods: {
    newGame: function () {
      this.$store.commit('switchView', 'bartender-selection')
      this.$store.dispatch('startCountdown')
    }
  }
})
</script>