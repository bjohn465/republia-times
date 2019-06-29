describe('starting a game', function() {
  it('starts the first day', function() {
    cy.visit('/')
    cy.getByText('Start Work').click()
    cy.get('h1').within(function() {
      cy.queryByText('Day 1').should('exist')
    })
  })
})
