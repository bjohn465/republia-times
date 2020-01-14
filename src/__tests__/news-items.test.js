// @flow strict-local
import { getShuffledNewsItems } from '../news-items'

describe('getShuffledNewsItems', () => {
  it('defaults to shuffling the array of all news items', () => {
    const randomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.223)
    const firstResult = getShuffledNewsItems()
    expect(firstResult.length).toBeGreaterThan(0)

    randomSpy.mockReturnValue(0.45)
    const secondResult = getShuffledNewsItems()
    // Ensure they don't reference the same array object
    expect(firstResult).not.toBe(secondResult)
    // Ensure their contents are different
    expect(firstResult).not.toEqual(secondResult)

    randomSpy.mockRestore()
  })

  it('shuffles news items passed into it', () => {
    const newsItems = [
      {
        id: 'test-news-item-1',
        getBlurb: () => 'blurb one',
        getArticle: () => 'article one',
        isInteresting: false,
        loyalty: 0,
      },
      {
        id: 'test-news-item-2',
        getBlurb: () => 'blurb two',
        getArticle: () => 'article two',
        isInteresting: false,
        loyalty: 0,
      },
      {
        id: 'test-news-item-3',
        getBlurb: () => 'blurb three',
        getArticle: () => 'article three',
        isInteresting: false,
        loyalty: 0,
      },
    ]

    const randomSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.22)
    const firstResult = getShuffledNewsItems(newsItems)
    expect(firstResult).toHaveLength(newsItems.length)
    // Ensure they don't reference the same array object
    expect(firstResult).not.toBe(newsItems)

    randomSpy.mockReturnValue(0.5)
    const secondResult = getShuffledNewsItems(newsItems)
    // Ensure their contents are different
    expect(firstResult).not.toEqual(secondResult)

    randomSpy.mockRestore()
  })
})
