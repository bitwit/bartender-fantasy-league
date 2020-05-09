<template>
  <div class="intro-view view-container">
    <h1 class="intro-title">Select 3 Bartenders</h1>

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
            <bartender :bartender="bartenders[mouseoverBartenderIndex]"></bartender>
            <h5>{{bartenders[mouseoverBartenderIndex].description}}</h5>
          </div>
        </div>
        <button v-if="bartenderSelectionIndices.length >= 3" @click="onSubmit()" class="next-button">
          <span class="title">Go</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import Bartender from '../classes/Bartender'

export default Vue.component('bartender-selection-section', {
  data: function () {
    return {
      mouseoverBartenderIndex: -1,
      bartenderSelectionIndices: <number[]>[],
      bartenders: [
        new Bartender("kyle1", "Kyle", "A Cool Guy"),
        new Bartender("kyle2", "Elyk", "A Weird Guy"),
        new Bartender("kyle3", "Joe", "A Dope Guy"),
        new Bartender("kyle4", "Eugene", "A Smelly Guy"),
        new Bartender("kyle5", "George", "An Athletic Guy"),
        new Bartender("kyle6", "Jerry", "A Stoner Guy"),
        new Bartender("kyle7", "Bertha", "A Loser Guy"),
        new Bartender("kyle8", "Henry", "Another Guy"),
        new Bartender("kyle9", "The Goat", "A Goat"),
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

.bartender-container {
  width: 33%;
}

.bartender {
  &.selected-true {
    background-color: green;
  }
}

.bartender-description-container {
  height: 80%;
}

.bartender-description {

}

.next-button {
  width: 100%;
  height: 20%;
}

</style>