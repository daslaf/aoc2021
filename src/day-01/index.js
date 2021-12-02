import { sampleInput as input } from './input.js'
import { toArray } from '../utils.js'
import { countIncreases, countWindowIncreases } from './main.js'

const data = toArray(input).map(n => +n)

// Part 1
console.log(countIncreases(data))

// Part 2
console.log(countWindowIncreases(data))
