<template>
  <div class="bartender" :style="headStyles">
    <div class="bartender-face" :style="faceStyles"></div>
    <h3 class="bartender-name">{{bartender.name}}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'

export default Vue.component('bartender', {
  props: {
    bartender: Object
  },
  data: function() { 
    return {
      mood: 'happy'
    }
  },
  computed: Vuex.mapState({
    headStyles: function () {
      return {
        background: `url(./img/${this.bartender.id}-head.png) top`
      }
    },
    faceStyles: function () {
      return {
        'background-image': `url(./img/${this.bartender.expressions}-${this.mood}-expression.png)`
      }
    }
  })
})
</script>

<style lang="scss">
.bartender {
  position: relative;
  background-color: white;
  border: 1px solid #666;
  color: #333;
  width: 80pt;
  height: 80pt;
  margin: 0 auto 10px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
    background-color: rgba($color: #EEEEEE, $alpha: 1.0)
  }
  .bartender-face {
    background-size: auto;
    background-position: top;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
h3.bartender-name {
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  color: blue;
  margin: 0;
}
</style>