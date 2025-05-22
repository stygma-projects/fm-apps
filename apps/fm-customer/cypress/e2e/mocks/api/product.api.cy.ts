export const getProduct = (statusCode: number, fixture?: string) => {
    cy.intercept(
      'GET',
      '**/trpc/inventory.product.list?*',
      req => {
        req.reply({ fixture, statusCode });
      }
    ).as('getProduct');
  };