import { realInput as input } from './input.js'
import { getPowerConsumption, getSupportRating } from './main.js'
import { toArray } from '../utils.js'

const data = toArray(input)

console.log(getPowerConsumption(data))
console.log(getSupportRating(data))
