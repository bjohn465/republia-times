describe('game run-through', function() {
  it('displays the morning screen and starts the first day', function() {
    let performanceNowValue = 0

    cy.clock()
    cy.visit('/', {
      onBeforeLoad: windowObject => {
        cy.stub(windowObject.performance, 'now', () => performanceNowValue)
      },
    })

    // Ensure that we're on the morning screen
    cy.get('h1').within(function() {
      cy.queryByText('The Republia Times').should('exist')
    })
    cy.findByText('Start Work').click()

    // Ensure that we've started the first day at 6:00 AM
    cy.get('h1').within(function() {
      cy.queryByText('Day 1').should('exist')
    })
    cy.findByLabelText('Work day clock')
      .within(function() {
        cy.queryByText('6:00 AM').should('exist')
      })
      .then(function() {
        performanceNowValue = 200
        cy.tick(200)
      })

    // Ensure that the clock updated
    cy.findByLabelText('Work day clock').within(function() {
      cy.queryByText('6:02 AM').should('exist')
    })
  })
})
