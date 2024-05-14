/// <reference types="cypress" />
import selectors from "../support/selectors"

describe('REV-1-WEB - Start return order with Order Number and Email', () => {
  context("Given user access the return initiation page and has an order number and email address", () => {
    beforeEach(() => {
      cy.visit('/partner')
      cy.fixture('orders.json').as('orders')

      cy.get(selectors.orderInputSelector).as('order')
      cy.get(selectors.emailInputSelector).as('email')
      cy.get(selectors.formButtonSelector).as("continue")
    })

    context("When user types a valid order number and it's related email address", () => {
      beforeEach(() => {
        cy.get('@orders').then(orders => {
          orders.valid.forEach(order => {
            cy.get('@order').type(order.number)
            cy.get('@email').type(order.email)
            cy.get('@continue').click()
          });
        })
      })

      it('Then user is redirected to order articles page', () => {
        cy.location('pathname')
          .should('eq', '/partner/order')
      })
    })

    context("When user types a valid order number and invalid email address", () => {
      beforeEach(() => {
        cy.get('@orders').then(orders => {
          orders.invalidEmail.forEach(order => {
            cy.get('@order').type(order.number)
            cy.get('@order').type(order.number)
            cy.get('@email').type(order.email)
            cy.get('@continue').click()
          })
        })
      })

      it("Then system displays the error message: 'Enter a valid e-mail'", () => {
        cy.get(selectors.errorMessage)
          .contains('Enter a valid e-mail')
          .should('be.visible')

        cy.location('pathname')
          .should('eq', '/partner')
      })
    })

    context("When user types an invalid order number and valid email address", () => {
      beforeEach(() => {
        cy.get('@orders').then(orders => {
          orders.invalidNumber.forEach(order => {
            cy.get('@order').type(order.number)
            cy.get('@order').type(order.number)
            cy.get('@email').type(order.email)
            cy.get('@continue').click()
          })
        })
      })

      it.only("Then system displays the error message: 'Enter a valid e-mail'", () => {
        cy.get(selectors.errorMessage)
          .contains('Enter a valid order number')
          .should('be.visible')

        cy.location('pathname')
          .should('eq', '/partner')
      })
    })
  })
})