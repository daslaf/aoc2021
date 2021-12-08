import { realInput as input } from './input.js'

const summatory = n => n * (n + 1) / 2
const crabs = input.split(',').map(v => +v)

// part 1
function getCheapestOutcome(crabs) {
  const max = Math.max(...crabs)
  let minEffort

  for (let pos = 0; pos <= max; pos++) {
    let totalEffort = 0

    for (const crab of crabs) {
      totalEffort += Math.abs(crab - pos)
    }

    minEffort = minEffort ? Math.min(totalEffort, minEffort) : totalEffort
  }


  return minEffort
}

// part 2 
function getCheapestOutcome2(crabs) {
  const max = Math.max(...crabs)
  let minEffort

  for (let pos = 0; pos <= max; pos++) {
    let totalEffort = 0

    for (const crab of crabs) {
      totalEffort += summatory(Math.abs(crab - pos))
    }

    minEffort = minEffort ? Math.min(totalEffort, minEffort) : totalEffort
  }


  return minEffort
}


console.log(getCheapestOutcome(crabs))
console.log(getCheapestOutcome2(crabs))