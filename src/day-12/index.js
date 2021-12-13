import { realInput as input } from './input.js'

const edges = input.split(/\n/).map(line => line.split('-'))

const getEdgesForNode = edges => node =>
  edges
    .filter(edge => edge.includes(node))
    .map(([a, b]) => (a === node ? [a, b] : [b, a]))

const getEdges = getEdgesForNode(edges)

function getPaths1() {
  let currentEdges = getEdges('start')
  let piles = new Set()
  let round = 1

  do {
    // console.group(`Round ${round++}`)
    // console.log('Edges start as', currentEdges.map(edge => edge.toString()))
    const [path, ...rest] = currentEdges
    // console.log(`Path being traveled "${path.toString()}"`)
    const walked = path.slice(0, -1)
    const nextStop = path.slice(-1)[0]

    const whereToGoNext = getEdges(nextStop)
      .filter(edge => !edge.includes('start')) // don't care for starts here
      .filter(([_, to]) => {
        const wasVisited = path.includes(to)
        const cantRevisit = wasVisited && to === to.toLowerCase()

        return !cantRevisit
      })

    // console.log(`Get next edges from ${nextStop}`, whereToGoNext)

    if (whereToGoNext.length === 0) {
      // console.log(`path "${walked}" ended at "${nextStop}"`)
      // piles.add(path.toString())
      currentEdges = rest
      // console.log('current edges', currentEdges.map(edge => edge.toString()))
      // console.log('piles', piles)
      // console.groupEnd()
      continue
    }

    const pathsSoFar = whereToGoNext
      .map(t => [...walked, ...t])
      .reduce(
        (acc, t) => {
          const itEnds = t.slice(-1)[0] === 'end'
          acc[itEnds ? 1 : 0].push(t)
          return acc
        },
        [[], []]
      )
    const [unfinished, ended] = pathsSoFar
    ended.forEach(path => piles.add(path.toString()))
    currentEdges = [...unfinished, ...rest]
    // console.log('current edges', currentEdges.map(edge => edge.toString()))
    // console.log('piles', piles)
    // console.groupEnd()
  } while (currentEdges.length > 0)

  return piles.size
}

console.log(getPaths1())

function getPaths2() {
  let currentEdges = getEdges('start')
  let piles = new Set()

  do {
    const [path, ...rest] = currentEdges
    const walked = path.slice(0, -1)
    const nextStop = path.slice(-1)[0]

    const smallCavesInPath = path.slice(1).filter(cave => cave === cave.toLowerCase())
    const uniqueSmallCaves = new Set(smallCavesInPath)

    const whereToGoNext = getEdges(nextStop)
      .filter(edge => !edge.includes('start')) // don't care for starts here
      .filter(() => {
        const roomForOneSmallCave = smallCavesInPath.length - uniqueSmallCaves.size <= 1
        return roomForOneSmallCave
      })

    if (whereToGoNext.length === 0) {
      currentEdges = rest
      continue
    }

    const pathsSoFar = whereToGoNext
      .map(t => [...walked, ...t])
      .reduce(
        (acc, t) => {
          const itEnds = t.slice(-1)[0] === 'end'
          acc[itEnds ? 1 : 0].push(t)
          return acc
        },
        [[], []]
      )
    const [unfinished, ended] = pathsSoFar
    ended.forEach(path => piles.add(path.toString()))
    currentEdges = [...unfinished, ...rest]
  } while (currentEdges.length > 0)

  return piles.size
}

console.log(getPaths2())


