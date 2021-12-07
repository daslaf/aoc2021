import { realInput as input } from './input.js'
import { toArray } from '../utils.js'

export const range = (start, end) => {
  return new Array(Math.abs(start - end))
    .fill(0)
    .map((_, index) => end > start ? start + index : start - index)
}

export const getPoints = vent => {
  const { direction, value } = vent
  const [start, end] = value

  if (direction === 'horizontal') {
    return range(start.x, end.x + 1).map(x => `${x},${start.y}`)
  } else if (direction === 'vertical') {
    return range(start.y, end.y + 1).map(y => `${start.x},${y}`)
  } else if (direction === 'diagonal') {
    const xs = range(start.x, end.x + 1)
    const ys = range(start.y, end.y - start.y > 0 ? end.y + 1 : end.y - 1)

    // zip
    return xs.map((x, i) => `${x},${ys[i]}`)
  }
}

export const Vent = line => {
  const coords = line
    .split(' -> ')
    .map(coords => coords.split(','))
    .flatMap(([x, y]) => ({ x: +x, y: +y }))

  const direction = (() => {
    const [start, end] = coords

    if (start.x === end.x) return 'vertical'
    if (start.y === end.y) return 'horizontal'

    return 'diagonal'
  })()

  const value = coords.sort((left, right) => {
    if (direction === 'horizontal') return left.x < right.x ? -1 : 1
    if (direction === 'vertical') return left.y < right.y ? -1 : 1

    return left.x < right.x ? -1 : 1
  })

  return Object.freeze({
    value: value,
    direction: direction
  })
}

const getIntersections = input => {
  const dots = new Map()
  const lines = toArray(input).map(Vent)

  for (const line of lines) {
    const points = getPoints(line)

    for (const point of points) {
      const reps = dots.get(point) || 0
      dots.set(point, reps + 1)
    }
  }

  return Array.from(dots).filter(([_, times]) => times > 1).length
}

console.log(getIntersections(input))
