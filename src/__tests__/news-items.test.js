// @flow strict-local
import { getNewsItemsForDay } from '../news-items'

describe('getNewsItemsForDay', () => {
  it.each`
    day  | mockRandomValue | usedNewsItemNumbers
    ${0} | ${0.223}        | ${[]}
    ${1} | ${0.45}         | ${[16, 18, 41]}
    ${2} | ${0.5}          | ${[0, 16, 18, 41, 42]}
    ${3} | ${0.12}         | ${[0, 16, 18, 41, 42]}
    ${4} | ${0.88}         | ${[0, 14, 16, 17, 18, 41, 42]}
    ${5} | ${0.762}        | ${[0, 13, 14, 15, 16, 17, 18, 41, 42]}
    ${6} | ${0.357}        | ${[0, 13, 14, 15, 16, 17, 18, 41, 42]}
  `(
    'returns the correct items for day $day',
    ({ day, mockRandomValue, usedNewsItemNumbers }) => {
      const mathDotRandom = jest
        .spyOn(global.Math, 'random')
        .mockReturnValue(mockRandomValue)
      const usedNewsItemIds = new Set(
        usedNewsItemNumbers.map(num => `news-item-${num}`)
      )
      const newsItems = getNewsItemsForDay(day, usedNewsItemIds)

      // Has at most 10 items
      expect(newsItems.length).toBeLessThanOrEqual(10)

      // Has at least 7 items
      expect(newsItems.length).toBeGreaterThanOrEqual(7)

      // Has no more than one weather message
      expect(
        newsItems.filter(item => item.messageType === 'weather').length
      ).toBeLessThanOrEqual(1)

      // Shouldn't return items that aren't supposed to show up on this day
      expect(newsItems.find(item => item.dayRangeStart > day)).toBeUndefined()
      expect(
        newsItems.find(item => item.dayRangeEnd < day && item.dayRangeEnd > 0)
      ).toBeUndefined()

      // Shouldn't return already-used items
      expect(
        newsItems.find(item => usedNewsItemIds.has(item.id))
      ).toBeUndefined()

      mathDotRandom.mockRestore()
    }
  )
})
