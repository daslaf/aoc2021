import { realInput as input } from './input.js'

const data = input.split(/\n\n/gm)
const numbers = data[0].split(',').map(n => +n)
const boards = data.slice(1).map(makeBoard)

//#region Board

function makeBoard(boardInput) {
  const numbers = boardInput
    .split(/\n/mg)
    .map(row => row.trim().split(/\s+/).map(s => ({ marked: false, value: +s })))

  return {
    completed: false,
    numbers: numbers
  }
}

// returns coordinates where a number is, otherwise returns null
function findInBoard(number, boardNumbers) {
  let rowNumber = 0;

  for (const row of boardNumbers) {
    const col = row.findIndex(tile => tile.value === number)

    if (col !== -1) return { row: rowNumber, col }

    rowNumber++
  }

  return null
}

// returns updated board numbers
function markNumber(position, boardNumbers) {
  const { row, col } = position

  const updatedRow = [
    ...boardNumbers[row].slice(0, col),
    {
      ...boardNumbers[row][col],
      marked: true
    },
    ...boardNumbers[row].slice(col + 1)
  ]

  return [
    ...boardNumbers.slice(0, row),
    updatedRow,
    ...boardNumbers.slice(row + 1)
  ]
}

function updateBoard(position, board) {
  const updatedNumbers = markNumber(position, board.numbers)

  const isRowCompleted = checkIfCompleted(updatedNumbers[position.row])
  const isColumnCompleted = checkIfCompleted(
    updatedNumbers.map(row => row[position.col])
  )

  return {
    completed: board.completed || isRowCompleted || isColumnCompleted,
    numbers: updatedNumbers
  }
}

function checkIfCompleted(numbers) {
  return numbers.every(tile => tile.marked)
}

//#endregion

function makeMove(number, board) {
  const position = findInBoard(number, board.numbers)
  return position ? updateBoard(position, board) : board
}

function play(numbers, boards) {
  const winningBoards = []
  let updatedBoards = [...boards]

  for (const number of numbers) {
    const boardsAfterMove = updatedBoards.map(board => makeMove(number, board))
    const winnerIndex = boardsAfterMove.findIndex(board => board.completed)
    const winner = boardsAfterMove[winnerIndex]
    updatedBoards = boardsAfterMove.filter(board => !board.completed)

    if (winner) {
      winningBoards.push({ board: winner, winningNumber: number })
    }
  }

  const firstWinner = winningBoards[0]
  const lastWinner = winningBoards.slice(-1)[0]

  console.log('firstWinner', calculateScoreBoard(firstWinner.winningNumber, firstWinner.board))
  console.log('lastWinner', calculateScoreBoard(lastWinner.winningNumber, lastWinner.board))
}

function calculateScoreBoard(lastNumberPlayed, winningBoard) {
  const totalSum = winningBoard.numbers
    .flatMap(row => row.filter(el => !el.marked).map(el => el.value))
    .reduce((total, num) => total + num, 0)

  return lastNumberPlayed * totalSum
}

play(numbers, boards)

/*
1. Qué hacemos con la data?
  - Depende de como resolvemos el problema, acomodamos la data
    a un formato que nos sea útil
2. Pensar en las acciones relevantes para el problema: bingo
  - Juego se compone de una serie de turnos hasta que haya un ganador
  - El turno comienza cuando se saca un número de la tómbola (primer input)
  - Chequear en cada cartón si está el número
    - De estar marcarlo como encontrado
      - Verificar si la fila y columna ya está completa
        - De estarlo, se acaba el juego
  - Repetir
*/