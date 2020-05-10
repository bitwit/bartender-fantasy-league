import BusinessCost from '../classes/BusinessCost'

export default interface WeeklyResult {
  pricePerDrink: number
  costPerDrink: number
  drinksSold: number
  totalRevenue: number

  fixedCostTotal: number
  fixedCosts: BusinessCost[]
  variableCostTotal: number

  taxes: number

  retainedEarnings: number
}