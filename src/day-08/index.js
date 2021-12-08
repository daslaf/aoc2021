import { difference, intersection } from 'ramda'
import { realInput as input } from './input.js'

const segmentsByDigitAmount = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6
}

const entries = input.split(/\n/)
  .map(line => line.split('|').map(entry => entry.trim()))
  .map(entry => entry.map(section => section.split(' ')))
const outputs = entries
  .flatMap(entry => entry[1])

// part 1
function countEasyDigits(data) {
  const one = segmentsByDigitAmount[1]
  const four = segmentsByDigitAmount[4]
  const seven = segmentsByDigitAmount[7]
  const eight = segmentsByDigitAmount[8]

  const targeted = [one, four, seven, eight]

  return data
    .flat()
    .filter(digit => targeted.includes(digit.length))
    .length
}

console.log(countEasyDigits(outputs))

// part 2
/*
  Figure out:
  0
  2
  3
  5
  6
  9

  With 6 segments [0, 6, 9]
  With 5 segments [2, 3, 5]
*/

const stringsEq = a => b => {
  return a.split('').sort().join('') === b.split('').sort().join('')
}

function getOutputValue([patterns, output]) {
  // Get A segment
  const one = patterns.find(digit => digit.length === 2)
  const four = patterns.find(digit => digit.length === 4)
  const seven = patterns.find(digit => digit.length === 3)
  const eight = patterns.find(digit => digit.length === 7)

  // patterns grouped by length
  const twoThreeFives = patterns.filter(p => p.length === 5)
  const zeroSixNines = patterns.filter(p => p.length === 6) // 2 of 3 have all 3 horizontal segments

  // All in twoThreeFives have horizontal segments
  const horizontals = twoThreeFives.reduce((a, b) => intersection(a, b))


  // Number 3 = horizontals + rigth hand vertical (1)
  const three = twoThreeFives.find(stringsEq([...horizontals, ...one].join('')))

  // 609s
  // Number 9 and 6 = all horizontals
  // Number 0       = just 2 horizontals (no middle)
  // Get D segment -> Guess 0
  const D = intersection(horizontals, four)[0]
  const [zero, ...sixNines] = zeroSixNines.sort(p => !p.includes(D) ? -1 : 1)

  // Number 9 = the one in sixNines that has all members of one
  const [nine, six] = sixNines.sort(p => intersection(one, p).length === 2 ? -1 : 1)

  // Number 5 = intersection between 6 and 9
  const five = twoThreeFives.find(stringsEq(intersection(...sixNines).join('')))

  // Number 2 = twoThreeFives minus three and five
  const two = difference(twoThreeFives, [three, five])[0]

  const numbers = [zero, one, two, three, four, five, six, seven, eight, nine]
  const digits = output.map(p => numbers.findIndex(stringsEq(p)))

  return +digits.join('')
}

function getOutputSummatory(entries) {
  return entries.reduce((acc, entry) => acc + getOutputValue(entry), 0)
}


console.log(getOutputSummatory(entries))
