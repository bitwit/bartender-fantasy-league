<template>
  <div v-bind:class="typeClass" class="asset">
    <span class="title">&nbsp;{{asset.name}}</span>
    <span v-if="asset.expiryInWeeks > 0" class="expiry">{{asset.expiryInWeeks}}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('asset', {
  props: {
    asset: Object
  },
  computed: {
    typeClass: function () {
      const obj: any = {}
      obj[`type-${this.asset.id}`] = true
      return obj
    }
  }
})
</script>
<style lang="scss">

</style