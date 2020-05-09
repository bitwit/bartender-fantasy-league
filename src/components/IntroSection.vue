<template>
  <div class="intro-view view-container">
    <h2>Name your bar</h2>
    <input type="text" v-model="barName" @keyup="nameChanged" name="barName"/>

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
    nameChanged: function () {
      console.log('name changed')
      this.$store.commit('setBarName', this.barName)
    },
    newGame: function () {
      this.$store.commit('setBarName', this.barName)
      this.$store.commit('switchView', 'bartender-selection')
    }
  }
})
</script>

<style lang="scss">
label {
  display: block;
}
.game-start {
  display: block;
  margin: 0 auto;
}
</style>