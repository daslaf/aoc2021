import { realInput as input } from './input.js'
import { toArray } from '../utils.js'
import { getProduct, navigate, regularNavigationStrategy, withAimNavigationStrategy } from './main.js'

const instructions = toArray(input).map(line => {
  const [direction, amount] = line.split(' ')

  return {
    direction,
    amount: +amount
  }
})

// Part 1
console.log(
  getProduct(
    navigate(
      regularNavigationStrategy,
      { x: 0, y: 0 },
      instructions
    )
  )
)

// Part 2
console.log(
  getProduct(
    navigate(
      withAimNavigationStrategy,
      { x: 0, y: 0, aim: 0 },
      instructions
    )
  )
)
