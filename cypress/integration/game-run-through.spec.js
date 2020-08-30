describe('game run-through', function () {
  before(function () {
    cy.visit('/')
  })

  describe('initial screen', function () {
    it('displays the correct heading', function () {
      cy.findByRole('heading', { name: 'The Republia Times' }).should('exist')
      cy.findByRole('heading', { name: 'Day 1' }).should('exist')
    })

    it('has a button that starts the work day', function () {
      cy.findByText('Start Work').should('exist').click()
    })
  })
})
