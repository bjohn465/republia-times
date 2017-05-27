/* eslint-disable flowtype/require-valid-file-annotation, immutable/no-mutation */
import outputRevision from '../output-revision'

describe('outputRevision', () => {
  const realConsoleInfo = global.console.info
  const realGitRev = process.env.GIT_REVISION

  beforeEach(() => {
    global.console.info = jest.fn()
  })
  afterEach(() => {
    global.console.info = realConsoleInfo
    process.env.GIT_REVISION = realGitRev
  })

  it('outputs code revision', () => {
    process.env.GIT_REVISION = '5df079898d8c851f785d17542f6c9494724a6a68'
    outputRevision()
    expect(global.console.info).toHaveBeenCalledWith(
      'Revision 5df079898d8c851f785d17542f6c9494724a6a68'
    )
  })

  it('uses "unknown" when revision is not defined', () => {
    process.env.GIT_REVISION = ''
    outputRevision()
    expect(global.console.info).toHaveBeenCalledWith(
      'Revision unknown'
    )
  })
})
