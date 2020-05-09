<template>
  <div class="bartender">
    <h3>{{bartender.name}}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('bartender', {
  props: {
    bartender: Object
  }
})
</script>

<style lang="scss">
.bartender {
  background-color: white;
  border: 1px solid #666;
  color: #333;
  width: 100pt;
  height: 100pt;
  margin: 0 auto 10px;
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
    background-color: rgba($color: #EEEEEE, $alpha: 1.0)
  }
}
</style>