import { getProduct } from "./mocks/api/product.api.cy"
import { getIngredient } from "./mocks/api/ingredient.api.cy";

describe('Product page', () => {

    beforeEach(() => {
        getProduct(200, 'product.json')
        getIngredient(200, 'ingredient.json')
        cy.visit("/order/cat1/products")
        cy.wait('@getProduct')

        cy.get('[data-cy="fmc-product-card"]').first().click()
        cy.wait('@getIngredient')
    })

    const goBackToProductCategory = () => {
        // cancel the stepper first
        cy.get('[data-cy="fmc-cancel-step-button"]').click()
        cy.get('[data-cy="fmc-return-product-category-page"]').should('exist').click()
    }

    const doOneStep = () => {
        cy.get('[data-cy="fmc-ingredient-stepper-card"]').filter(':visible').first().click()
        cy.get('[data-cy="fmc-next-step-button"]').filter(':visible').click()
    }

    const testStepperWithTwoSteps = () => {
        doOneStep()
        
        cy.get('[data-cy="fmc-ingredient-stepper-card"]').filter(':visible').first().click()

        cy.get('[data-cy="fmc-back-step-button"]').filter(':visible').click()
        cy.get('[data-cy="fmc-cancel-step-button"]').filter(':visible').click()

        cy.get('[data-cy="fmc-product-card"]').contains('Coca-cola').should('exist')
    }

    const testStepperWithThreeSteps = () => {
        doOneStep()
        doOneStep()
        
        cy.get('[data-cy="fmc-ingredient-stepper-card"]').filter(':visible').first().click()
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

    })

})