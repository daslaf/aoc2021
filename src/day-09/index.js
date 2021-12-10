import { realInput as input } from './input.js'

const points = input.split(/\n/).map(row => row.split('').map(v => +v))

// part 1
function getAdjacentCoordinates({ width, height }, [x, y]) {
  const top = y !== 0 ? [x, y - 1] : null
  const right = x !== width - 1 ? [x + 1, y] : null
  const bottom = y !== height - 1 ? [x, y + 1] : null
  const left = x !== 0 ? [x - 1, y] : null

  return Object.assign(
    {},
    top && { top },
    right && { right },
    bottom && { bottom },
    left && { left },
  ) // We get rid of nulls easily
}

function isLowPoint(board, [x, y]) {
  const width = board[0].length
  const height = board.length
  const adjacent = getAdjacentCoordinates({ width, height }, [x, y])

  const isLow = Object.values(adjacent).every(([x1, y1]) => {
    const adjacentValue = board[y1][x1]
    return adjacentValue > board[y][x]
  })

  return isLow
}

function findLowPoints(board) {
  let lowPoints = []

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const isLow = isLowPoint(board, [x, y])

      if (isLow) lowPoints.push([x, y])
    }
  }

  return lowPoints
}

function getLowPointsRiskLevel(board) {
  const lowPoints = findLowPoints(board)

  return lowPoints.map(([x, y]) => board[y][x]).reduce((a, b) => a + b + 1, 0)

}

console.log(getLowPointsRiskLevel(points))

// part 2
function getLargetsBasinsProduct(board) {
  const basins = findLowPoints(board)
    .map(point => findBasin(board, point))
    .sort((a, b) => a >= b ? -1 : 1)
    .slice(0, 3)

  return basins.reduce((acc, basin) => acc * basin, 1)
}

function findBasin(board, [x, y]) {
  let signals = Object.entries(getAdjacentCoordinates({ width: board[0].length, height: board.length }, [x, y]))
  let count = signals.length + 1

  for (const [direction, [x1, y1]] of signals) {
    const isDeadEnd = board[y1][x1] === 9

    if (isDeadEnd) {
      count -= 1
      continue
    }

    // const opposite = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[direction]
    const adjacents = ignoreOrigin(
      direction,
      getAdjacentCoordinates({ width: board[0].length, height: board.length }, [x1, y1]),
    )

    const newSignals = Object.entries(adjacents).filter(signal => !signals.find(s => s[1].toString() === signal[1].toString()))

    signals.push(...newSignals)
    count += newSignals.length
  }

  return count
}

function ignoreOrigin(surroundingPosition, surroundings) {
  switch (surroundingPosition) {
    case 'top': {
      const { bottom, ...rest } = surroundings
      return rest
    }
    case 'right': {
      const { left, ...rest } = surroundings
      return rest
    }
    case 'bottom': {
      const { top, ...rest } = surroundings
      return rest
    }
    case 'left': {
      const { right, ...rest } = surroundings
      return rest
    }
  }
}

console.log(getLargetsBasinsProduct(points))

