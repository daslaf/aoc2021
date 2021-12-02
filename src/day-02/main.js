export function getProduct(point) {
  return point.x * point.y
}

export const regularNavigationStrategy = {
  forward: (amount, point) => ({
    ...point,
    x: point.x + amount
  }),
  down: (amount, point) => ({
    ...point,
    y: point.y + amount
  }),
  up: (amount, point) => ({
    ...point,
    y: point.y - amount
  })
}

export const withAimNavigationStrategy = {
  forward: (amount, point) => ({
    ...point,
    x: point.x + amount,
    y: point.y + point.aim * amount
  }),
  down: (amount, point) => ({
    ...point,
    aim: point.aim + amount,
  }),
  up: (amount, point) => ({
    ...point,
    aim: point.aim - amount,
  })
}

export function navigate(navigationStrategy, point, instructions) {
  const navigationReducer = (position, instruction) => {
    const operation = navigationStrategy[instruction.direction]

    return operation
      ? operation(instruction.amount, position)
      : position
  }

  return instructions.reduce(navigationReducer, point)
}
