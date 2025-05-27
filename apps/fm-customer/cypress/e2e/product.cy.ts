import { getProduct } from './mocks/api/product.api.cy'
import { getIngredient } from './mocks/api/ingredient.api.cy'

describe('Product page', () => {
  beforeEach(() => {
    getProduct(200, 'product.json')
    getIngredient(200, 'ingredient.json')
    cy.visit('/order/cat1/products')
    cy.wait('@getProduct')

    cy.get('[data-cy="fmc-product-card"]').first().click()
    cy.wait('@getIngredient')
  })

  const goBackToProductCategory = () => {
    // cancel the first stepper
    cy.get('[data-cy="fmc-cancel-step-button"]').click()
    cy.get('[data-cy="fmc-return-product-category-page"]')
      .filter(':visible')
      .click()
  }

  const doOneStep = () => {
    cy.get('[data-cy="fmc-ingredient-stepper-card"]')
      .filter(':visible')
      .first()
      .click()
    cy.get('[data-cy="fmc-next-step-button"]').filter(':visible').click()
  }

  const testStepperWithTwoSteps = () => {
    doOneStep()

    cy.get('[data-cy="fmc-ingredient-stepper-card"]')
      .filter(':visible')
      .first()
      .click()

    cy.get('[data-cy="fmc-back-step-button"]').filter(':visible').click()
    cy.get('[data-cy="fmc-cancel-step-button"]').filter(':visible').click()

    cy.get('[data-cy="fmc-product-card"]').contains('Coca-cola').should('exist')
  }

  const testStepperWithThreeSteps = () => {
    doOneStep()
    doOneStep()

    cy.get('[data-cy="fmc-ingredient-stepper-card"]')
      .filter(':visible')
      .first()
      .click()
    cy.get('[data-cy="fmc-validate-step-button"]').filter(':visible').click()
  }

  // desktop
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-11')
    })

    it('should do 2 step and cancel it', () => {
      testStepperWithTwoSteps()
    })

    it('should validate the stepper of a product', () => {
      testStepperWithThreeSteps()
    })

    it('should return to the previous page', () => {
      goBackToProductCategory()
    })

    it('should test the accordion from the cart and validate the cart', () => {
      testStepperWithThreeSteps()
      cy.get('[data-cy="fmc-product-card"]').first().click()

      testStepperWithThreeSteps()

      cy.get('[data-cy="fmc-accordion-tab-0"]')
        .filter(':visible')
        .click()
        .then(() => {
          cy.get('[data-cy="fmc-accordion-tab-1"]').filter(':visible').click()

          cy.get('[data-cy="fmc-accordion-content-0"]').should('not.be.visible')

          cy.get('[data-cy="fmc-accordion-content-1"]').should('be.visible')
        })

      cy.get('[data-cy="fmc-validate-cart"]').should('be.visible').click()
      cy.url().should('contain', '/order/validate-basket')
    })
  })

  // mobile
  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('should do 2 step and cancel it', () => {
      testStepperWithTwoSteps()
    })

    it('should validate the stepper of a product', () => {
      testStepperWithThreeSteps()
    })

    it('should return to the previous page', () => {
      goBackToProductCategory()
    })

    it('should test the accordion from the cart and validate the cart', () => {
      testStepperWithThreeSteps()
      cy.get('[data-cy="fmc-product-card"]').first().click()

      testStepperWithThreeSteps()
      cy.get('[data-cy="fmc-drawer-button"]').filter(':visible').click()

      cy.get('[data-cy="fmc-accordion-tab-0"]')
        .filter(':visible')
        .click()
        .then(() => {
          // Should close the opened one
          cy.get('[data-cy="fmc-accordion-tab-1"]').filter(':visible').click()
          // Should fail
          cy.get('[data-cy="fmc-accordion-content-0"]').should('not.be.visible')
          // Should pass
          cy.get('[data-cy="fmc-accordion-content-1"]').should('be.visible')
        })

      cy.get('[data-cy="fmc-validate-cart"]').should('be.visible').click()
      cy.url().should('contain', '/order/validate-basket')
    })
  })
})
