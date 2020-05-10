<template>
  <div class="patron-character" :style="patronStyles(index)">
    <div class="patron-head" :style="headStyles">
      <div class="patron-face" :style="faceStyles"></div>
    </div>
    <div class="patron-body"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import Mood from '../enums/Mood'

export default Vue.component('patron-character', {
  props: {
    index: Number,
    mood: String
  },
  data: function() { 
    return {
      positionTop: 0,
      positionLeft: 0
    }
  },
  created: function() {
    this.positionTop = Math.random() * 100
    this.startTimer() 
  },
  computed: Vuex.mapState({
    headStyles: function () {
      return {
        'background-image': `url(./img/default-head.png)`
      }
    },
    faceStyles: function () {
      return {
        'background-image': `url(./img/male-${this.mood}-expression.png)`
      }
    },
  }),
  methods: {
    patronStyles: function (index: number) {
      return {
        top: `${this.positionTop}px`,
        left: `${this.positionLeft + (index * 120)}px`,
        'z-index': this.positionTop
      }
    },
    startTimer: function () {
      let timeout = Math.random() * 30000 + 10
      setTimeout( () => {
        this.positionTop = (Math.random() * 400) - 200
        this.positionLeft = (Math.random() * 60) - 30
        this.startTimer()
      }, timeout)
    }
  }
})
</script>

<style lang="scss">
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

.patron-character {
  position: absolute;
  z-index: 20;
  transition-property: top left z-index;
  transition-duration: 4s;

  .patron-head {
    background-size: cover;
    color: #333;
    width: em(80);
    height: em(80);
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    top: em(20);
  }
  .patron-face {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .patron-body {
    background: url('../../public/img/default-body.png');
    width: em(120);
    height: em(160);
    background-size: cover;
    margin: 0 auto;
  }
}
</style>