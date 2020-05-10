<template>
<div class="summary-wrapper">
  <div class="summary-container">
    <div class="table-container">
      <table class="summary-table">
        <tr>
          <th class="title">Drink Special Results</th>
          <th class="positive-true">{{results.drinkRating}}/5</th>
        </tr>
        <tr>
          <td class="title">Drinks Sold</td>
          <td class="value">{{results.drinksSold | number}}</td>
        </tr>
        <tr>
          <td class="title">Revenue per drink</td>
          <td class="value">${{results.avgRevenuePerDrink | number}}</td>
        </tr>
        <tr>
          <td class="title">Total Revenue</td>
          <td class="value">${{results.totalDrinkRevenue | number}}</td>
        </tr>
        <tr>
          <td class="title">Cost per drink</td>
          <td class="value positive-false">${{results.avgCostPerDrink | number}}</td>
        </tr>
        <tr>
          <td class="title">Total Variable Costs</td>
          <td class="value positive-false">${{results.totalDrinkCost | number}}</td>
        </tr>
        <tr>
          <th class="title">Event Results</th>
        </tr>
        <tr>
          <td class="title">Revenue from events</td>
          <td class="value">${{results.revenueFromEvents}}</td>
        </tr>
        <tr>
          <td class="title">Losses from events</td>
          <td class="value positive-false">${{results.lossesFromEvent}}</td>
        </tr>

        <!-- MARK: fixed costs -->
        <tr>
          <th class="title">Fixed Costs</th>
          <th></th>
        </tr>
        <!--
        <tr class="subcost">
          <td class="title">Rent</td>
          <td class="value positive-false">xx</td>
        </tr>
        <tr class="subcost">
          <td class="title">Hydro</td>
          <td class="value positive-false">xx</td>
        </tr>
        <tr class="subcost">
          <td class="title">Labour</td>
          <td class="value positive-false">xx</td>
        </tr>
        -->
        <tr>
          <td class="title">Total</td>
          <td class="value positive-false">${{results.fixedCostsTotal | number}}</td>
        </tr>

        <tr>
          <th class="title">Taxes</th>
          <th></th>
        </tr>
        <tr>
          <td class="title">Business Tax {{results.taxRate | number}}%</td>
          <td class="value positive-false">${{results.taxes | number}}</td>
        </tr>

        <tr>
          <th class="title">Retained Earnings</th>
          <th class="value">${{results.retainedEarnings | number}}</th>
        </tr>
        <tr>
          <td class="title">Average Daily Earnings</td>
          <td class="value">${{results.averageEarningsPerDay | number}}</td>
        </tr>

      </table>
    </div>
    <div class="bartenders-row">
      <bartender-character 
        :bartender="bartender" 
        v-for="bartender in bartenders" 
        :key="bartender.id" />
    </div>
  </div><!-- container -->
  <button class="next-season" @click="onNextPressed()">Next Season</button>
</div><!-- wrapper -->
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import AppState from '../AppState'
import Bartender from '../classes/Bartender'

export default Vue.component('season-summary-section', {
  filters: {
    number: function (value: string, decimals: string) {
      if (!value) { return '' } 
      return parseFloat(value)
        .toFixed(parseInt(decimals))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  },
  computed: Vuex.mapState({
    results: function (state: AppState) {
      let seasonResults = {
        drinkRating: state.drinkRating(),
        revenueFromEvents: 0,
        lossesFromEvent: 0,
        drinksSold: 0,
        avgRevenuePerDrink: 0,
        totalDrinkRevenue: 0,
        avgCostPerDrink: 0,
        totalDrinkCost: 0,
        fixedCostsTotal: 0,
        taxes: 0,
        taxRate: 0,
        retainedEarnings: 0,
        averageEarningsPerDay: 0
      }
      let season = state.seasons[state.currentSeasonIndex] 
      season.results.forEach((result) => {
        seasonResults.totalDrinkRevenue += result.pricePerDrink * result.drinksSold
        seasonResults.totalDrinkCost += result.costPerDrink * result.drinksSold
        seasonResults.drinksSold += result.drinksSold
        seasonResults.fixedCostsTotal += result.fixedCostTotal
        seasonResults.taxes += result.taxes
        seasonResults.retainedEarnings += result.retainedEarnings
      })
      seasonResults.avgRevenuePerDrink = seasonResults.totalDrinkRevenue / seasonResults.drinksSold
      seasonResults.avgCostPerDrink = state.businessObject.stats.costPerDrink
      seasonResults.taxRate = 100 * state.businessObject.stats.taxRate
      seasonResults.averageEarningsPerDay = seasonResults.retainedEarnings / season.results.length

      season.eventsAccepted.forEach((event) => {
        if (event.cash > 0) {
          seasonResults.revenueFromEvents += event.cash
        } else if (event.cash < 0) {
          seasonResults.lossesFromEvent += Math.abs(event.cash)
        }
      })

      return seasonResults
    },
    cashValuePositiveClass: function (state: AppState) {
      const obj: any = {}
      obj[`positive-${state.businessObject.stats.cash > 0}`] = true
      return obj
    },
    bartenders: function(state: AppState) {
      return state.selectedBartenders
    }
  }),
  methods: {
    onNextPressed: function () {
      this.$store.commit('switchView', 'drink-building')
    }
  }
})
</script>

<style lang="scss">
.positive-true {
  color: green;
}
.positive-false {
  color: red;
}

.summary-container {
  display: flex;
}

.bartenders-row {
  display: flex;
  .bartender-character {
    flex-basis: 33%;
  }
}
button.next-season {
  width: 200px;
  height: 80px;
  display: block;
  float: right;
}

.table-container {
  width: 100%;
  height: 100%;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

table.summary-table {
  margin: 0 auto;
  border-spacing: 5px;
}
tr.subcost {
  td.title, td.value {
    font-size: 14px;
  } 
}
th.value, td.value {
  text-align: right;
  font-family: "Lucida Console", Monaco, monospace;
}
th:first-child, td:first-child {
  text-align: right;
  padding-right: 30px;
}

</style>
