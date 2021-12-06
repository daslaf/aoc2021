import { expect } from 'chai'
import { getPoints, range, Vent } from '../index.js'

describe('range', () => {
  it('should return a range of increasing elements', () => {
    expect(range(2, 7)).eql([2, 3, 4, 5, 6])
  })

  it('should return a range of decreasing elements', () => {
    expect(range(7, 2)).eql([7, 6, 5, 4, 3])
  })
})

describe('getPoints', () => {
  it('should return a list of horizontal points', () => {
    const v1 = Vent('1,2 -> 7,2')
    const v2 = Vent('7,2 -> 1,2')
    const result = ['1,2', '2,2', '3,2', '4,2', '5,2', '6,2', '7,2']

    expect(getPoints(v1)).eql(result)
    expect(getPoints(v2)).eql(result)
  })

  it('should return a list of vertical points', () => {
    const v1 = Vent('1,2 -> 1,6')
    const v2 = Vent('1,6 -> 1,2')
    const result = ['1,2', '1,3', '1,4', '1,5', '1,6']

    expect(getPoints(v1)).eql(result)
    expect(getPoints(v2)).eql(result)
  })

  it('should return a list of diagonal points', () => {
    const v1 = Vent('1,2 -> 4,5')
    const v2 = Vent('4,5 -> 1,2')
    const result = ['1,2', '2,3', '3,4', '4,5']

    expect(getPoints(v1)).eql(result)
    expect(getPoints(v2)).eql(result)

    const v3 = Vent('2,3 -> 1,4')
    const v4 = Vent('1,4 -> 2,3')
    const result2 = ['1,4', '2,3']
    expect(getPoints(v3)).eql(result2)
    expect(getPoints(v4)).eql(result2)
  })
})
