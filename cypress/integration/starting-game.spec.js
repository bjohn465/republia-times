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

  describe('work day clock', function() {
    beforeEach(function() {
      cy.clock()
    })

    afterEach(function() {
      cy.clock().then(clock => {
        clock.restore()
      })
    })

    it('starts the day at 6:00 AM', function() {
      cy.getByLabelText('Work day clock').within(function() {
        cy.queryByText('6:00 AM').should('exist')
      })
    })
  })
})
