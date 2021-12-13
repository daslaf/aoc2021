import { realInput as input } from './input.js'

const entries = input.split(/\n/)

// part 1
const openingMatcher = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

function getSyntaxErrorScore(lines) {
  const scoreTable = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  return lines
    .map(line => scoreTable[findCorruptedChar(line)] || 0)
    .reduce((a, b) => a + b)
}

function findCorruptedChar(chars) {
  const expected = []

  for (const char of chars) {
    const complement = openingMatcher[char]

    if (complement) {
      expected.unshift(complement)
    } else {
      const shouldBe = expected.shift()

      if (shouldBe !== char) return char
    }
  }

  return null
}

console.log(getSyntaxErrorScore(entries))

// part 2
function findIncompletedLines(lines) {
  const incompletedLines = lines
    .map(line => classifyLine(line))
    .filter(line => line.type === 'incompleted')

  const scores = incompletedLines
    .map(line => calculateLineScore(line.remaining))
    .sort((a, b) => a > b ? -1 : 1)


  return scores[Math.floor(scores.length / 2)]
}

function classifyLine(chars) {
  const expected = []

  for (const char of chars) {
    const complement = openingMatcher[char]

    if (complement) {
      expected.unshift(complement)
    } else {
      const shouldBe = expected.shift()

      if (shouldBe !== char) return { type: 'corrupted', at: char }
    }
  }

  return expected.length
    ? { type: 'incompleted', remaining: expected }
    : { type: 'completed' }
}

function calculateLineScore(remaining) {
  const scoreTable = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  return remaining.reduce((score, char) => score * 5 + scoreTable[char], 0)
}

console.log(findIncompletedLines(entries))