export const toArray = input => input.split(/\n/gm).map(s => s.trim())
export const invertMatrix = matrix => matrix.reduce((matrix, row) => {
  let i = 0;

  for (const cell of row) {
    matrix[i] = (matrix[i] || []).concat(cell)
    i++
  }

  return matrix;
}, [])