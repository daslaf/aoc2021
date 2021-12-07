import { realInput as input } from './input.js'

function originalNaiveSolution(days, fishes) {
  // shallow clone
  let totalFishes = fishes.map(fish => ({ ...fish }))

  for (let day = 1; day <= days; day++) {
    for (const fish of totalFishes) {
      if (fish.days === 0) {
        fish.days = 6
        totalFishes.push({ days: 9 })
      } else {
        fish.days--
      }
    }
  }

  return totalFishes.length
}

const countBy = fn => arr => {
  return arr.reduce((acc, elem) => {
    const a = fn(elem)
    acc[a] = (acc[a] || 0) + 1
    return acc
  }, {})
}

function countFishes(days, fishes) {
  let fishesCount = countBy(fish => fish.days)(fishes)

  for (let day = 1; day <= days; day++) {
    let updated = {}
    let newSpans

    for (const numOfDays in fishesCount) {
      const amount = fishesCount[numOfDays]
      const num = +numOfDays
      // console.log(`S: ${amount} fishes with ${numOfDays} days left`)

      if (num === 0) {
        // updated[6] = amount // reset all that went to 0
        // updated[8] = newSpans
        newSpans = amount // spawn the same amount of fishes
      } else {
        updated[num - 1] = amount // take a day on fishes that don't spawn others
      }
    }

    // add newSpawns
    if (newSpans) {
      updated[8] = newSpans
      updated[6] = (updated[6] || 0) + newSpans
    }

    fishesCount = updated
  }

  return Object.entries(fishesCount).reduce((a, b) => a + b[1], 0)
}


const fishes = input.split(',').map(f => ({ days: +f }))

console.log(countFishes(256, fishes))
