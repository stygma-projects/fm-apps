import { getProductCategories } from './mocks/api/productCategory.api.cy'

describe('Product categories page', () => {
  beforeEach(() => {
    getProductCategories(200, 'productCategory.json')
    cy.visit('/order/product-categories')
    cy.wait('@getProductCategories')
  })

  // Simulates a click on a category card to navigate to the products page.
  const navigateToCategory = () => {
    cy.get('[data-cy="fmc-product-categories-card"]')
      .contains('Boissons')
      .click()
    cy.url().should('match', /\/order\/.*\/products$/)
  }

  // Checks that the number of category cards on the page matches the number of product categories.
  const checkNumberOfCategoryInPage = () => {
    cy.get('@getProductCategories').then((interception: any) => {
      const responseBody = interception.response?.body
      console.log(responseBody)
      const res = responseBody.result.data.length
      cy.get('[data-cy="fmc-product-categories-card"]').should(
        'have.length',
        res,
      )
    })
  }

  // desktop
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-11')
    })

    it(
      'should navigate to the products page by clicking on a category card',
      navigateToCategory,
    )

    it('should verify that the number of category cards matches the number of categories from the API', () => {
      checkNumberOfCategoryInPage()
    })
  })

  // mobile
  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it(
      'should navigate to the products page by clicking on a category card',
      navigateToCategory,
    )

    it('should verify that the number of category cards matches the number of categories from the API', () => {
      checkNumberOfCategoryInPage()
    })
  })
})
