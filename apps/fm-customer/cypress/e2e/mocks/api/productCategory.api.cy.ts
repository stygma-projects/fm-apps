export const getProductCategories = (statusCode: number, fixture?: string) => {
    cy.intercept(
      'GET',
      '**/trpc/inventory.productCategory.list?*',
      req => {
        req.reply({ fixture, statusCode });
      }
    ).as('getProductCategories');
  };