<template>
  <div class="intro-view view-container">
    <h1 class="intro-title">Drink Building</h1>

    <h2>Pick your {{category.name}}</h2>
    <div class="ingredients-container">
      <div class="ingredient-container" v-for="(ingredient, index) in category.ingredients" :key="ingredient.id">
        <div class="ingredient" 
          :class="ingredientClass(index)" 
          :style="ingredientStyles"
          @click="onIngredientSelected(index)">
          <h3>{{ingredient.name}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Vuex from 'vuex'
import IngredientCategory from '../classes/IngredientCategory'
import Ingredient from '../classes/Ingredient'
import AppState from '../AppState'

export default Vue.component('drink-building-section', {
  data: function() {
    return {
      currentCategoryIndex: 0,
      currentCategoryIngredientIndex: -1,
      ingredientSelections: <Ingredient[]>[]
    }
  },
  computed: Vuex.mapState({
    category: function () {
      return this.categories[this.currentCategoryIndex]
    },
    categories: function (state: AppState) {
      //TODO: randomize the order of categories and ingredients
      return state.ingredientCategories
    },
    ingredientStyles: function() {
      return {
        'background-image': `url(./img/default-${this.category.id}.png)`,
      } 
    }
  }),
  methods: {
    ingredientClass: function(index: number) {
      let obj: any = {}
      obj[`selected-${this.currentCategoryIngredientIndex == index}`] = true
      return obj
    },
    nextCategory: function() {
      this.currentCategoryIndex++ 
      if (this.currentCategoryIndex >= this.categories.length) {
        this.onIngredientSelectionComplete()
      } else {
        this.currentCategoryIngredientIndex = -1
      }
    },
    onIngredientSelected: function(index: number) {
        this.currentCategoryIngredientIndex = index
        this.ingredientSelections.push(this.category.ingredients[index])
        this.nextCategory()
    },
    onIngredientSelectionComplete: function () {
      this.$store.commit('setSpecialDrink', this.ingredientSelections)
      this.$store.commit('switchView', 'main')
      this.$store.dispatch('nextSeason')
    }
  }
})
</script>


<style lang="scss" scoped>
.ingredients-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 10%;
}

.ingredient-container {
  width: 16.6%;
}

.ingredient {
  background-color: white;
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-position: bottom;

  border: 1px solid #999;
  color: #333;
  width: 80pt;
  height: 80pt;
  margin: 0 auto 20px;
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
  }
  &.selected-true {
    background-color: green;
  }
}
</style>