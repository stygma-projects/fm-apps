import { getProductCategories } from './mocks/api/productCategory.api.cy';

describe('product categories page', () => {
  beforeEach(() => {
    getProductCategories(200, 'productCategory.json')
    cy.visit('/order/product-categories')
    cy.wait('@getProductCategories');
  })

  // From the index page it go to a product page by going threw the product categories page
  const navigateToCategory = () => {
    cy.get('[data-cy="fmc-category-card"]').contains('Boissons').click();
    cy.url().should('match', /\/order\/.*\/products$/)
  }

  // // Verification
  // const checkNumberOfCategoryInPage = () => {
  //   cy.get('a').contains(fr.order.title).should('be.visible').click()
  //   cy.wait('@productCategories').then((request) => {
  //     const res = request.response?.body
  //     const categoriesLength = res[0].result.data.length;
  //     cy.get('[data-card="card"]').should('have.length', categoriesLength)
  //   })
  // }

  // desktop
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-11')
    })

    it('should click and go in a product category', navigateToCategory)

    // it('should check that there is exactly the same number of card than categories from the api', () => {
    //   checkNumberOfCategoryInPage()
    // })
  })

  // mobile
  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x')
    })

    it('should click and go on a product category', navigateToCategory)

    // it('should check that there is exactly the same number of card than categories from the api', () => {
    //   checkNumberOfCategoryInPage()
    // })
  })

})