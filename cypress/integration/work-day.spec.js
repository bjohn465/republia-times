describe('work day', function() {
  before(function() {
    cy.visit('/')
    cy.clock()
    cy.findByText('Start Work').click()
  })

  after(function() {
    cy.clock().then(clock => {
      clock.restore()
    })
  })

  it('starts the day at 6:00 AM', function() {
    cy.findByLabelText('Work day clock').within(function() {
      cy.queryByText('6:00 AM').should('exist')
    })
  })
})
