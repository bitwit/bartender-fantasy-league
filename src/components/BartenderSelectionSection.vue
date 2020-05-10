<template>
  <div class="intro-view view-container">
    <h2 class="intro-title">Select 3 Bartenders</h2>

    <div class="picker-area">
      <div class="bartenders-area">
        <div class="bartender-container" 
          v-for="(bartender, index) in bartenders" 
          @click="onBartenderSelected(index)"
          @mouseenter="mouseoverBartenderIndex = index" 
          :key="bartender.id">
          <bartender :bartender="bartender" :class="bartenderClass(index)"></bartender>
        </div>
      </div>
      <div class=info-area>
        <div class="bartender-description-container">
          <div v-if="mouseoverBartenderIndex != -1" class="bartender-description">
            <bartender-character :bartender="bartenders[mouseoverBartenderIndex]">
            </bartender-character>
            <h3 class="bartender-title">{{bartenders[mouseoverBartenderIndex].title}}</h3>
            <h3>Difficulty: {{bartenders[mouseoverBartenderIndex].difficulty}}</h3>
            <p>{{bartenders[mouseoverBartenderIndex].description}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import AppState from '../AppState'
import Bartender from '../classes/Bartender'

export default Vue.component('bartender-selection-section', {
  data: function () {
    return {
      mouseoverBartenderIndex: -1,
      bartenderSelectionIndices: <number[]>[]
    }
  },
  computed: mapState({
    bartenders: function(state: AppState) { return state.bartenders }
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
      if (this.bartenderSelectionIndices.length >= 3) {
        this.onSubmit()
      }
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
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

.picker-area {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.bartenders-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 70%;
}

.info-area {
  display: flex;
  flex-direction: column;
  width: 30%;
}

h3.bartender-title {
  text-transform: capitalize;
}

.bartender-container {
  width: 33%;
}

.bartender {
  &.selected-true {
    border: em(5) solid red;
  }
}

.bartender-description-container {
  height: 80%;
}

.next-button {
  width: 100%;
  height: 20%;
}

@media only screen and (max-width: 1024px) {
  .intro-title {
    font-size: em(16);
  }
  .bartender-description-container {
    font-size: em(10);
  }
}
</style>