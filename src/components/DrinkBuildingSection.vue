<template>
  <div class="intro-view view-container">
    <h2 class="intro-title">Drink Building - Pick your {{category.name}}</h2>
    <div class="ingredients-container">
      <div class="ingredient-container" 
        v-for="(ingredient, index) in limitedOptions" 
        :key="ingredient.id">
        <div class="ingredient" 
          :class="ingredientClass(index)" 
          :style="ingredientStyles(index)"
          @click="onIngredientSelected(index)">
          <h5 class="ingredient-title">{{ingredient.name}}</h5>
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
import { shuffle } from '../utilities'

export default Vue.component('drink-building-section', {
  data: function() {
    return {
      currentCategoryIndex: 0,
      currentCategoryIngredientIndex: -1,
      ingredientSelections: <Ingredient[]>[],
      limitedOptions: <Ingredient[]>[],
    }
  },
  created: function () {
    this.selectIngredientOptions()
  },
  computed: Vuex.mapState({
    category: function () {
      return this.categories[this.currentCategoryIndex]
    },
    categories: function (state: AppState) {
      //TODO: randomize the order of categories and ingredients
      return state.ingredientCategories
    }
  }),
  methods: {
    selectIngredientOptions: function () {
      let category = this.categories[this.currentCategoryIndex] 
      let shuffledOptions = shuffle(category.ingredients)
      let limitedOptions
      if(category.canSelectNone) {
        limitedOptions = shuffledOptions.slice(0, 7)
        limitedOptions.push(new Ingredient({
          id: "none", 
          name: "None", 
          imageId: "none",
          mixProperties: "", 
          badMixProperties: ""
        }))
      } else {
        limitedOptions = shuffledOptions.slice(0, 8)
      }
      console.log('limited options', limitedOptions)
      this.limitedOptions = limitedOptions
    },
    ingredientClass: function(index: number) {
      let obj: any = {}
      obj[`selected-${this.currentCategoryIngredientIndex == index}`] = true
      return obj
    },
    ingredientStyles: function(index: number) {
      let ingredient = this.limitedOptions[index]
      return {
        'background-image': `url(./img/ingredient-${ingredient.imageId}.png)`,
      } 
    },
    nextCategory: function() {
      this.currentCategoryIndex++ 
      if (this.currentCategoryIndex >= this.categories.length) {
        this.onIngredientSelectionComplete()
      } else {
        this.selectIngredientOptions()
        this.currentCategoryIngredientIndex = -1
      }
    },
    onIngredientSelected: function(index: number) {
        this.currentCategoryIngredientIndex = index
        let option = this.limitedOptions[index]
        if(option.id != "none") {
          this.ingredientSelections.push(option)
        }
        this.$store.commit('setSpecialDrink', this.ingredientSelections)
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
$browser-context: 16; // Default
@function em($pixels, $context: $browser-context) {
  @return #{$pixels/$context}em;
}

.ingredients-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 10%;
}

.ingredient-container {
  width: 25%;
}

.ingredient {
  background-color: white;
  background-size: em(80) em(80);
  background-repeat: no-repeat;
  background-position: bottom;

  border: 1px solid #999;
  color: #333;
  width: em(80);
  height: em(80);
  margin: 0 auto em(20);
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
  }
  &.selected-true {
    background-color: green;
  }
}
.ingredient-title {
  display: block;
  background: rgba($color: #fff, $alpha: 0.6);
  border-bottom: em(1) solid rgba($color: #333, $alpha: 0.5);
  margin: 0;
}

</style>