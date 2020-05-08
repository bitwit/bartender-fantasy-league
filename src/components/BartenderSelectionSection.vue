<template>
  <div class="intro-view view-container">
    <h1 class="intro-title">Bartender Selection</h1>

    <div class="bartenders">
      <div class="bartender-container" v-for="(bartender, index) in bartenders" @click="onBartenderSelected(index)" :key="bartender.id">
        <bartender :bartender="bartender" :class="bartenderClass(index)"></bartender>
      </div>
    </div>

    <button @click="onSubmit()" class="game-start">
      <span class="title">Go</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import Bartender from '../classes/Bartender'

export default Vue.component('bartender-selection-section', {
  data: function () {
    return {
      bartenderSelectionIndices: <number[]>[],
      bartenders: [
        new Bartender("kyle1", "Kyle"),
        new Bartender("kyle2", "Elyk"),
        new Bartender("kyle3", "Joe"),
        new Bartender("kyle4", "Eugene"),
        new Bartender("kyle5", "George"),
        new Bartender("kyle6", "Jerry"),
        new Bartender("kyle7", "Bertha"),
        new Bartender("kyle8", "Henry"),
        new Bartender("kyle9", "The Goat"),
      ]
    }
  },
  computed: mapState({
  }),
  methods: {
    bartenderClass: function(index: number) {
      let obj: any = {}
      this.bartenderSelectionIndices.indexOf(index)
      obj[`selected-${this.bartenderSelectionIndices.indexOf(index) != -1}`] = true
      return obj
    },
    onBartenderSelected: function(index: number) {
      let existingIndexOfSelection = this.bartenderSelectionIndices.lastIndexOf(index)
      if (existingIndexOfSelection !== -1) {
        this.bartenderSelectionIndices.splice(existingIndexOfSelection, 1)
        return
      } else if (this.bartenderSelectionIndices.length >= 3) {
        return
      }
      this.bartenderSelectionIndices.push(index)
    },
    onSubmit: function () {
      let bartenders = <Bartender[]>[]
      for(let index of this.bartenderSelectionIndices) {
        bartenders.push(this.bartenders[index])
      }
      this.$store.commit('setBartendersSelection', bartenders)
      this.$store.commit('switchView', 'drink-building')
    },
  }
})
</script>
<style lang="scss">
.bartenders {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 20%;
}

.bartender-container {
  width: 33%;
}

.bartender {
  &.selected-true {
    background-color: green;
  }
}
</style>