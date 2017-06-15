/* eslint-disable flowtype/require-valid-file-annotation, immutable/no-mutation */
import '../index'

function mockOutputRevision () {
  mockOutputRevision.wasCalled = true
}
jest.mock('../util/output-revision', () => jest.fn(mockOutputRevision))

function mockApp () {
  mockApp.wasRendered = true
  return null
}
jest.mock('../republia-times', () => jest.fn(mockApp))

describe('main module', () => {
  it('calls outputRevision', () => {
    expect(mockOutputRevision.wasCalled).toBe(true)
  })

  it('adds a div with a class to the body', () => {
    expect(document.querySelector('body > div.appContainer')).not.toBeNull()
  })

  it('renders the app', () => {
    expect(mockApp.wasRendered).toBe(true)
  })
})
