describe('game run-through', function() {
  it('displays the morning screen and starts the first day', function() {
    let performanceNowValue = 0

    function advanceTimeBy(value) {
      performanceNowValue = performanceNowValue + value
      cy.tick(200)
    }

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
        advanceTimeBy(200)
      })

    // Ensure that the clock updated
    cy.findByLabelText('Work day clock').within(function() {
      cy.queryByText('6:02 AM').should('exist')
    })

    // Check initial stats
    cy.findByLabelText('Paper Stats').within(function() {
      cy.queryByText('200 Readers').should('exist')
      cy.queryByText('Loyalty: 0').should('exist')
    })

    // Ensure we have a news feed
    cy.findByText('News Feed').should('exist')
    cy.findByLabelText('News Feed').should('exist')

    // Ensure that the "End Day" button works
    cy.findByText('End Day')
      .click()
      .then(function() {
        advanceTimeBy(1196)
      })
    cy.findByLabelText('Work day clock').within(function() {
      cy.findByText('6:00 PM').should('exist')
    })

    // Ensure clock doesn't keep going at the end of the day
    cy.clock().then(function() {
      advanceTimeBy(200)
    })
    cy.findByLabelText('Work day clock').within(function() {
      cy.findByText('6:00 PM').should('exist')
    })
  })
})
