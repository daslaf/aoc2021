import { realInput as input } from './input.js'

const summatory = n => (n * (n + 1)) / 2
const crabs = input.split(',').map(v => +v)

function getCheapestOutcomeByRate(rateFn, crabs) {
  const max = Math.max(...crabs)
  let minEffort

  for (let pos = 0; pos <= max; pos++) {
    let totalEffort = 0

    for (const crab of crabs) {
      totalEffort += rateFn({ destination: pos, currentPosition: crab })
    }

    minEffort = Math.min(totalEffort, minEffort || Infinity)
  }

  return minEffort
}

// part 1
console.log(
  getCheapestOutcomeByRate(({ destination, currentPosition }) => {
    return Math.abs(destination - currentPosition)
  }, crabs)
)

// part 2
console.log(
  getCheapestOutcomeByRate(({ destination, currentPosition }) => {
    return summatory(Math.abs(destination - currentPosition))
  }, crabs)
)

