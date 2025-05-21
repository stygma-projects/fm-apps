export const getIngredient = (statusCode: number, fixture?: string) => {
    cy.intercept(
      'GET',
      '**/trpc/inventory.ingredient.list?*',
      req => {
        req.reply({ fixture, statusCode });
      }
    ).as('getIngredient');
  };