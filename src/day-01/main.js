//#region part1
export function countIncreases(input) {
  let increases = 0

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      increases++
    }
  }

  return increases
}
//#endregion

//#region part2
export function countWindowIncreases(input) {
  const sums = subArrays(3, input)
    .map(nums => nums.reduce((acc, i) => acc + i))

  return countIncreases(sums)
}

const subArrays = (length, arr) =>
  arr.reduce((acc, _, index) => {
    const sub = arr.slice(index, index + length)

    if (sub.length !== length) return acc

    return [...acc, sub]
  }, [])
//#endregion
