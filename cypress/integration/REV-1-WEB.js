/// <reference types="cypress" />
import selectors from "../support/selectors"

describe('REV-1-WEB - Start return order with Order Number and Email', () => {
  context('Given user access the return initiation page', () => {
    beforeEach(() => {
      cy.visit('/partner')
    })

    context("When user types a valid order number and it's related email address", () => {
      beforeEach(() => {
        cy.fixture('valid_orders.json').as('validOrders')

        cy.get(selectors.orderInputSelector).as('order')
        cy.get(selectors.emailInputSelector).as('email')
        cy.get(selectors.formButtonSelector).as("continue")

        cy.get('@validOrders').then(order => {
          cy.get('@order')
            .type(order.orderNumber)
          cy.get('@email')
            .type(order.email)
          cy.get('@continue')
            .click()
        })
      })

      it('Then user is redirected to order articles page', () => {
        cy.location('pathname').should('eq', '/partner/order')
      })
    })
  })
})