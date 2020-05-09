<template>
  <div class="bartender-character">
    <div class="bartender-head" :style="headStyles">
      <div class="bartender-face" :style="faceStyles"></div>
    </div>
    <div class="bartender-body"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
export default Vue.component('bartender-character', {
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
        'background-image': `url(./img/${this.bartender.id}-head.png)`
      }
    },
    faceStyles: function () {
      return {
        'background-image': `url(./img/${this.bartender.expressions}-${this.mood}-expression.png)`
      }
    },
  })
})
</script>

<style lang="scss">
.bartender-character {

  .bartender-head {
    background-size: cover;
    color: #333;
    width: 80pt;
    height: 80pt;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    top: 20px;
  }
  .bartender-face {
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .bartender-body {
    background: url('../../public/img/default-body.png');
    width: 120pt;
    height: 160pt;
    background-size: cover;
    margin: 0 auto;
  }
}
</style>