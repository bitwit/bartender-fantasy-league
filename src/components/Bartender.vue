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
  color: #333;
  width: 100pt;
  height: 100pt;
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
  }
}
</style>