import { realInput as input } from './input.js'

const octopuses = input
  .split(/\n/)
  .map(row => row.split('').map(v => ({ flashed: false, lightLevel: +v })))

const getAdjacentCoordinates = ({ width, height }) => {
  return ([x, y]) => {
    const top = y !== 0 ? [x, y - 1] : null
    const right = x !== width - 1 ? [x + 1, y] : null
    const bottom = y !== height - 1 ? [x, y + 1] : null
    const left = x !== 0 ? [x - 1, y] : null

    // diagonals
    const topRight = top && right ? [right[0], top[1]] : null
    const bottomRight = bottom && right ? [right[0], bottom[1]] : null
    const bottomLeft = bottom && left ? [left[0], bottom[1]] : null
    const topLeft = top && left ? [left[0], top[1]] : null

    return Object.assign(
      {},
      top && { top },
      topRight && { topRight },
      right && { right },
      bottomRight && { bottomRight },
      bottom && { bottom },
      bottomLeft && { bottomLeft },
      left && { left },
      topLeft && { topLeft }
    ) // We get rid of nulls easily
  }
}

const width = octopuses[0].length
const height = octopuses.length

const getCoordinates = getAdjacentCoordinates({ width, height })

function step(octos) {
  let flashes = 0
  let octopuses = octos.map(row =>
    row.map(oct => ({ ...oct, lightLevel: oct.lightLevel + 1 }))
  ) // increases the energy of all octopuses by 1
  let updatedOctopuses
  let siblings

  do {
    updatedOctopuses = octopuses.map(row => new Array(row.length)) // creates an empty matrix to store updated octopuses
    siblings = new Map()

    for (let y = 0; y < octopuses.length; y++) {
      for (let x = 0; x < octopuses[y].length; x++) {
        const octopus = octopuses[y][x]
        const shouldFlash = octopus.lightLevel > 9 && octopus.flashed === false
        // just update those that should flash
        // the rest will be updated after collecting all the sibling coordinates
        updatedOctopuses[y][x] = shouldFlash
          ? { flashed: true, lightLevel: 0 }
          : octopus
        flashes = shouldFlash ? flashes + 1 : flashes

        if (shouldFlash) {
          // search all the siblings that did not flash immediately
          // and put them in a queue of octopuses to be updated
          Object.values(getCoordinates([x, y]))
            .filter(([x1, y1]) => octopuses[y1][x1].lightLevel <= 9)
            .forEach(([x1, y1]) => {
              const current = siblings.get(`${x1},${y1}`) || 0
              siblings.set(`${x1},${y1}`, current + 1)
            })
        }
      }
    }

    // apply updates
    for (const [coord, times] of siblings) {
      const [x, y] = coord.split(',')
      const octopus = updatedOctopuses[+y][+x]
      if (!octopus.flashed) {
        updatedOctopuses[+y][+x] = {
          ...octopus,
          lightLevel: octopus.lightLevel + times,
        }
      }
    }

    octopuses = updatedOctopuses
  } while (siblings.size > 0)

  return [
    flashes,
    octopuses.map(row => row.map(oct => ({ ...oct, flashed: false }))),
  ]
}

function countFlashes(data) {
  let flashes = 0
  let octopuses = data.map(row => row.map(oct => ({ ...oct })))

  for (let i = 0; i < 100; i++) {
    const [count, updatedOctopuses] = step(octopuses)
    flashes += count
    octopuses = updatedOctopuses
  }

  return flashes
}

console.log(countFlashes(octopuses))

// part 2
function finalFlash(data) {
  const totalOctopuses = width * height
  let octopuses = data.map(row => row.map(oct => ({ ...oct })))
  let allFlashedAtOnce = false
  let steps = 0

  while (!allFlashedAtOnce) {
    const [count, updatedOctopuses] = step(octopuses)
    octopuses = updatedOctopuses

    if (count === totalOctopuses) allFlashedAtOnce = true

    steps++
  }

  return steps
}

console.log(finalFlash(octopuses))
