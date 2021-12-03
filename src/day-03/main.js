import { invertMatrix } from '../utils.js'

// part 1

const identity = n => n
const map = fn => arr => arr.map(fn)
const binToDec = n => parseInt(n, 2)
const countBy = fn => arr => {
  return arr.reduce((acc, elem) => {
    const a = fn(elem)
    acc[a] = (acc[a] || 0) + 1
    return acc
  }, {})
}
const getDigitCount = map(countBy(identity))

export function getPowerConsumption(data) {
  const count = getDigitCount(invertMatrix(data))

  const [gamma, epsilon] = count.reduce(
    (acc, entry) => {
      const values = entry['0'] > entry['1'] ? ['0', '1'] : ['1', '0']

      return [acc[0] + values[0], acc[1] + values[1]]
    },
    ['', '']
  )

  return binToDec(gamma) * binToDec(epsilon)
}

// part 2

export function getSupportRating(data) {
  let oxygenGeneratorRatings
  let co2ScrubberRatings
  const numbers = invertMatrix(data)

  for (const members of numbers) {
    // this is only true for the first iteration
    if (!oxygenGeneratorRatings && !co2ScrubberRatings) {
      const ones = new Set()
      const zeroes = new Set()

      // categorize everything and loop over all the elements in members
      members.forEach((digit, index) => {
        const set = digit === '1' ? ones : zeroes
        set.add(index)
      })

      oxygenGeneratorRatings = ones.size >= zeroes.size ? ones : zeroes
      co2ScrubberRatings = zeroes.size <= ones.size ? zeroes : ones

      continue
    }

    // filter until each rating has 1 element
    if (oxygenGeneratorRatings.size > 1) {
      const ones = new Set()
      const zeroes = new Set()

      for (const index of oxygenGeneratorRatings) {
        const set = members[index] === '1' ? ones : zeroes
        set.add(index)
      }

      oxygenGeneratorRatings = ones.size >= zeroes.size ? ones : zeroes
    }

    if (co2ScrubberRatings.size > 1) {
      const ones = new Set()
      const zeroes = new Set()

      for (const index of co2ScrubberRatings) {
        const set = members[index] === '1' ? ones : zeroes
        set.add(index)
      }

      co2ScrubberRatings = zeroes.size <= ones.size ? zeroes : ones
    }

    // console.log('oxygenGeneratorRatings', oxygenGeneratorRatings)
    // console.log('co2ScrubberRatings', co2ScrubberRatings)

    if ((oxygenGeneratorRatings.size === 1) & (co2ScrubberRatings.size === 1)) {
      break
    }
  }

  const ogrIndex = Array.from(oxygenGeneratorRatings)[0];
  const csIndex = Array.from(co2ScrubberRatings)[0];

  return binToDec(data[ogrIndex]) * binToDec(data[csIndex])
}
