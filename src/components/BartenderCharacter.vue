<template>
  <div class="bartender-character">
    <div class="bartender-head" :style="headStyles"></div>
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
  computed: Vuex.mapState({
    headStyles: function () {
      return {
        'background-image': `url(./img/${this.bartender.id}-head.png)`
      }
    }
  })
})
</script>

<style lang="scss">
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
.bartender-body {
  background: url('../../public/img/default-body.png');
  width: 120pt;
  height: 160pt;
  background-size: cover;
  margin: 0 auto;
}
</style>