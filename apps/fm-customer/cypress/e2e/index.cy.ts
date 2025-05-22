import { fr } from '../../src/i18n/locales/fr'

describe('product categories page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  

  // From the index page it go to a product page by going threw the product categories page
  const navigateToCategoryPage = () => {
    cy.get('[data-cy="fmc-order-button"]').should('have.text', fr.order.title).click();
    cy.url().should('include', '/order/product-categories')
  }

  // desktop
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-11')
    })

    it('should click and go in the order route', navigateToCategoryPage)
  })

  // mobile
  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('should click and go in the order route', navigateToCategoryPage)
  })

})