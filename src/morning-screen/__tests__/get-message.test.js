/* eslint-disable flowtype/require-valid-file-annotation */
import getMessage from '../get-message'

describe('getMessage', () => {
  describe('day 1', () => {
    it('it uses the given government name', () => {
      const result = getMessage({ governmentName: 'Metropolis' })
      expect(result).toEqual([
        `Welcome to The Metropolis Times. You are the new editor-in-chief.`,
        `The war with Antegria is over` +
          ` and the rebellion uprising has been crushed.` +
          ` Order is slowly returning to Metropolis.`,
        `The public is not loyal to the government.`,
        `It is your job to increase their loyalty` +
          ` by editing The Metropolis Times carefully.` +
          ` Pick only stories that highlight the good things` +
          ` about Metropolis and its government.`,
        `You have 3 days to raise the public's loyalty to 20.`,
        `As a precaution against influence,` +
          ` we are keeping your wife and child in a safe location.`
      ])
    })
  })
})
