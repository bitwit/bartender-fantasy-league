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
    bartender: Object,
    mood: {
      type: String,
      default: 'happy'
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
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}
.bartender-character {

  .bartender-head {
    background-size: cover;
    color: #333;
    width: em(80);
    height: em(80);
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
    top: em(20);
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
    width: em(120);
    height: em(160);
    background-size: cover;
    margin: 0 auto;
  }
}


@media only screen and (max-width: 1024px) {
  .bartender-character {
    font-size: em(8);
    background-size: cover;
  }
}
</style>