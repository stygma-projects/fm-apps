export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: 'frites',
    name: 'Frites',
    products: [
      {
        id: 'frites-petite',
        name: 'Petite Frite',
        price: 2.50,
      },
      {
        id: 'frites-moyenne',
        name: 'Moyenne Frite',
        price: 3.50,
      },
      {
        id: 'frites-grande',
        name: 'Grande Frite',
        price: 4.50,
      },
    ],
  },
  {
    id: 'snacks',
    name: 'Snacks',
    products: [
      {
        id: 'burger',
        name: 'Burger',
        price: 5.50,
      },
      {
        id: 'cheeseburger',
        name: 'Cheeseburger',
        price: 6.00,
      },
      {
        id: 'double-cheese',
        name: 'Double Cheese',
        price: 7.50,
      },
      {
        id: 'mitraillette',
        name: 'Mitraillette',
        price: 6.50,
      },
    ],
  },
  {
    id: 'viandes',
    name: 'Viandes',
    products: [
      {
        id: 'merguez',
        name: 'Merguez',
        price: 3.50,
      },
      {
        id: 'chipolata',
        name: 'Chipolata',
        price: 3.50,
      },
      {
        id: 'nuggets',
        name: 'Nuggets (6)',
        price: 4.50,
      },
      {
        id: 'cordon-bleu',
        name: 'Cordon Bleu',
        price: 4.00,
      },
    ],
  },
  {
    id: 'sauces',
    name: 'Sauces',
    products: [
      {
        id: 'mayonnaise',
        name: 'Mayonnaise',
        price: 0.50,
      },
      {
        id: 'ketchup',
        name: 'Ketchup',
        price: 0.50,
      },
      {
        id: 'andalouse',
        name: 'Andalouse',
        price: 0.50,
      },
      {
        id: 'samourai',
        name: 'Samouraï',
        price: 0.50,
      },
      {
        id: 'barbecue',
        name: 'Barbecue',
        price: 0.50,
      },
    ],
  },
  {
    id: 'boissons',
    name: 'Boissons',
    products: [
      {
        id: 'coca',
        name: 'Coca-Cola',
        price: 2.00,
      },
      {
        id: 'fanta',
        name: 'Fanta',
        price: 2.00,
      },
      {
        id: 'sprite',
        name: 'Sprite',
        price: 2.00,
      },
      {
        id: 'eau',
        name: 'Eau minérale',
        price: 1.50,
      },
    ],
  },
]; 