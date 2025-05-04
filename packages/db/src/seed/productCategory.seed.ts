import { prisma } from '../index'

export enum ProductCategoryLabel {
  SANDWICHES = 'Sandwiches',
  AMERICAINS = 'Americains',
  DESSERTS = 'Desserts',
  DRINKS = 'Boissons',
  SPECIALITIES = 'Specialites',
  BURGERS = 'Hamburgers',
  PANINIS = 'Paninis',
  FRIES = 'Frites',
  MEAT = 'Viandes',
  TACOS = 'Tacos',
  SALADS = 'Nos Salades',
  HALF_AMERICAINS = 'Demi-Americains',
  WRAPS = 'Wraps',
  HALF_SANDWICHES = 'Demi-Sandwichs',
  FLAMMESKUECHES = 'Flammeskueches',
  PLATES = 'Assiettes',
}
export const createProductCategories = async () =>
  await prisma.productCategory.createMany({
    data: [
      { label: ProductCategoryLabel.SANDWICHES },
      { label: ProductCategoryLabel.AMERICAINS },
      { label: ProductCategoryLabel.DESSERTS },
      { label: ProductCategoryLabel.DRINKS },
      { label: ProductCategoryLabel.SPECIALITIES },
      { label: ProductCategoryLabel.BURGERS },
      { label: ProductCategoryLabel.PANINIS },
      { label: ProductCategoryLabel.FRIES },
      { label: ProductCategoryLabel.MEAT },
      { label: ProductCategoryLabel.TACOS },
      { label: ProductCategoryLabel.PLATES },
      { label: ProductCategoryLabel.HALF_AMERICAINS },
      { label: ProductCategoryLabel.WRAPS },
      { label: ProductCategoryLabel.HALF_SANDWICHES },
      { label: ProductCategoryLabel.FLAMMESKUECHES },
      { label: ProductCategoryLabel.SALADS },
    ],
  })
