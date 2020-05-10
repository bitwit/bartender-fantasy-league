<template>
  <div class="intro-wrapper">
    <div class="intro-text-area">
      <img class="logo" src="../../public/img/logo.png" />
      <h1>Bartender Fantasy League</h1>
      <p>
        Live out your dream of being a bar manager in all it's glory.
        <br />
        <br />
        Be a decision maker, make cocktails, get drunk on the job, hire a goat, 
        and 'help' the owner's spouse. All your usual bar management challenges from the comfort of your own home.
        <br />
        <br />
        Anyone can be a good bar manager. There's nothing to it.. or is there?
      </p>
    </div>
  <div class="bar-name-area view-container">
    <h2>Name your bar</h2>
    <input 
      class="bar-name-input" 
      type="text"
      placeholder= "Some Random Bar"
      v-model="barName" 
      @keyup="nameChanged" 
      name="barName"/>
    <button @click="newGame()" class="game-start">
      <span class="title">Let's do this</span>
    </button>
  </div>
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
.intro-wrapper {
  font-size: 20px;
  display: flex;
  justify-content: space-around;
}
.intro-text-area {
  flex-basis: 40%;
  text-align: left;
}
img.logo {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
}
h1 {
  font-size: 28px;
}

.bar-name-area {
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
}
label {
  display: block;
}
.bar-name-input {
  width: 80%;
  height: 40px;
  font-size: 28px;
  margin: 0 auto;
}
.game-start {
  display: block;
  margin: 20px auto 0;
  width: 60%;
  height: 50px;
  font-size: 28px;
  background: cornflowerblue;
  color: white;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba($color: #338833, $alpha: 1.0);
  }
}
</style>