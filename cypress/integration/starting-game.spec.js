describe('starting a game', function() {
  it('displays the morning screen', function() {
    cy.visit('/')
    cy.get('h1').within(function() {
      cy.queryByText('The Republia Times').should('exist')
    })
  })

  it('starts the first day', function() {
    cy.getByText('Start Work').click()
    cy.get('h1').within(function() {
      cy.queryByText('Day 1').should('exist')
    })
  })
})
