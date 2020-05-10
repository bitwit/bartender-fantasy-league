<template>
    <div :class="typeClass" class="announcement">
    <h2 :class="typeClass" class="event-title">
      <span class="title">{{event.name}}</span>
    </h2>
    <p class="description">{{event.description}}</p>

    <!-- event costs -->
    <div class="cost-info positive-false" v-if="event.cash < 0">
      <span>Loss: ${{Math.abs(event.cash)}}</span>
    </div>
    <div class="cost-info positive-true" v-if="event.cash > 0">
      <span>Gain: ${{Math.abs(event.cash)}}</span>
    </div>
    <div v-if="event.hidesModHints == false">
      <div class="cost-info positive-true" v-if="event.baseCustomersMod > 0">
        <span>Gain New Customers</span>
      </div>
      <div class="cost-info positive-false" v-if="event.baseCustomersMod < 0">
        <span>Lose Some Customers</span>
      </div>
      <div class="cost-info" v-if="event.priceMod > 0">
        <span>Drink Price Increase</span>
      </div>
      <div class="cost-info positive-false" v-if="event.priceMod < 0">
        <span>Drink Price Decrease</span>
      </div>
    </div>
    <!-- /event costs -->

    <div class="buttons-container">
      <button :class="typeClass" @click="acceptEvent()" class="accept">
        <span class="title">{{event.acceptText}}</span>
        <br>
        <span class="hotkey-button">space</span>
      </button>
      <button 
        v-if="event.isRejectable"
        :class="typeClass" 
        @click="rejectEvent()" 
        class="reject">
        <span class="title oi">{{event.rejectText}}</span>
        <br>
        <span class="hotkey-button">esc</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component('ls-announcement', {
  props: {
    event: Object
  },
  computed: {
    typeClass: function () {
      const obj: any = {}
      obj[`type-${this.event.id}`] = true
      return obj
    }
  },
  methods: {
    acceptEvent: function () {
      this.$emit('accept-event')
    },
    rejectEvent: function () {
      this.$emit('reject-event')
    }
  }
})
</script>
<style lang="scss">

/* line 541, style.sass */
div.announcements {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0; }
  /* line 549, style.sass */
  div.announcements.displaying-false {
    display: none;
    pointer-events: none; }

/* line 553, style.sass */
div.announcement {
  box-sizing: border-box;
  margin: 2% auto 0;
  border-width: 0.625em;
  border-style: solid;
  padding: 0 2.5em;
  width: 31.25em;
  height: 41.25em;
  background-color: #FFF;
  text-align: center; }
  /* line 565, style.sass */
  div.announcement.ng-enter, div.announcement.ng-leave {
    -moz-transition: opacity 0.8s ease-out 0s;
    -o-transition: opacity 0.8s ease-out 0s;
    -webkit-transition: opacity 0.8s ease-out;
    -webkit-transition-delay: 0s;
    transition: opacity 0.8s ease-out 0s; }
  /* line 569, style.sass */
  div.announcement.ng-leave.ng-leave-active, div.announcement.ng-enter {
    opacity: 0; }
  /* line 573, style.sass */
  div.announcement.ng-leave, div.announcement.ng-enter.ng-enter-active {
    opacity: 1; }
  /* line 577, style.sass */
  div.announcement h2.event-title {
    padding: 0.625em 0;
    background-color: inherit;
    border-width: 0.25em;
    border-style: double;
    color: #333; }
  /* line 584, style.sass */
  div.announcement div.oi {
    font-size: 16em;
    color: inherit; }
  /* line 588, style.sass */
  div.announcement p.description {
    font-size: 1.75em;
    color: #333;
    margin: 0 }

  .cost-info {
    margin: 6px 0;
    font-size: 24px;
  }

  /* line 593, style.sass */
  div.announcement button.accept, div.announcement button.reject {
    outline: none;
    cursor: pointer;
    font-size: 1em;
    margin: 1.25em 0;
    padding: 0.625em 0;
    border: 0.125em dotted inherit;
    -moz-border-radius: 0.25em;
    -webkit-border-radius: 0.25em;
    border-radius: 0.25em;
    width: 47.5%;
    background: none; }
    /* line 603, style.sass */
    div.announcement button.accept span, div.announcement button.reject span {
      font-size: 1.75em; }
    /* line 605, style.sass */
    div.announcement button.accept:hover, div.announcement button.reject:hover {
      opacity: 0.85; }
      /* line 607, style.sass */
      div.announcement button.accept:hover .hotkey-button, div.announcement button.reject:hover .hotkey-button {
        display: inline-block; }
    /* line 610, style.sass */
    div.announcement button.accept .hotkey-button, div.announcement button.reject .hotkey-button {
      display: inline-block;
      margin-top: 0.25em;
      color: #333;
      font-size: 1em; }
  /* line 616, style.sass */
  div.buttons-container {
    display: flex;
    justify-content: center;
  }
  div.announcement button.accept {
    color: #b0ad64;
    margin-right: 5%; }
  /* line 620, style.sass */
  div.announcement button.reject {
    color: #d77167; }

/* line 623, style.sass */
.hotkey-button {
  line-height: 1.5em;
  border: 1px solid gray;
  padding: 0 5px;
  margin: 0 5px;
  font-size: 0.8em;
  text-transform: uppercase;
  -webkit-box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  -moz-box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  box-shadow: 1px 0 1px 0 #fff, 0 2px 0 2px lightGray, 0 2px 0 3px #333;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: -moz-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -webkit-gradient(linear, left top, right top, color-stop(0%, #ffffff), color-stop(25%, #e2e2e2));
  background: -webkit-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -o-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: -ms-linear-gradient(left, #ffffff 0%, #e2e2e2 25%);
  background: linear-gradient(to right, #ffffff 0%, #e2e2e2 25%); }
</style>