<template>
  <div class="intro-view view-container">
    <h1 class="intro-title">Drink Building</h1>

    <h2>Pick your {{category.name}}</h2>
    <div class="ingredients-container">
      <div class="ingredient-container" v-for="(ingredient, index) in category.ingredients" :key="ingredient.id">
        <div class="ingredient" :class="ingredientClass(index)" @click="onIngredientSelected(index)">
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

export default Vue.component('drink-building-section', {
  data: function() {
    return {
      //TODO: randomize the order of categories and ingredients
      categories: <IngredientCategory[]>[
        new IngredientCategory("garnish", "Garnish", [
          new Ingredient("mint", "Mint"),
          new Ingredient("grapefruit-peel", "Grapefruit Peel"),
          new Ingredient("orange-peel", "Orange Peel"),
          new Ingredient("lime-wheel", "Lime Wheel"),
          new Ingredient("lemon-wheel", "Lemon Wheel"),
        ]),
        new IngredientCategory("fruit", "Fruit", [
          new Ingredient("lime", "Lime"),
          new Ingredient("lemon", "Lemon"),
          new Ingredient("grapefruit", "Grapefruit"),
          new Ingredient("orange", "Orange"),
          new Ingredient("pineapple", "Pineapple"),
          new Ingredient("apple", "Apple")
        ])
      ],
      currentCategoryIndex: 0,
      currentCategoryIngredientIndex: -1,
      ingredientSelections: <Ingredient[]>[]
    }
  },
  computed: Vuex.mapState({
    category: function () {
      return this.categories[this.currentCategoryIndex]
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
      this.$store.dispatch('startCountdown')
    }
  }
})
</script>


<style lang="scss" scoped>
.ingredients-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 20%;
}

.ingredient-container {
  width: 33%;
}

.ingredient {
  background-color: white;
  color: #333;
  width: 100pt;
  height: 100pt;
  margin: auto;
  cursor: pointer;
  &:hover {
    color: cornflowerblue;
  }
  &.selected-true {
    background-color: green;
  }
}
</style>