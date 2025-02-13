import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Insérer des utilisateurs (exemple simple)
  const passwordHash = await hash('admin', 10);

  const users = await prisma.user.createMany({
    data: [
      {
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: passwordHash,
      },
      {
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        password: passwordHash,
      },
    ],
  });

  // 2. Insérer des catégories de produits
  const productCategories = await prisma.productCategory.createMany({
    data: [
      {
        label: 'Burgers',
        imageUrl: 'https://example.com/burger-category.jpg',
      },
      {
        label: 'Drinks',
        imageUrl: 'https://example.com/drinks-category.jpg',
      },
    ],
  });

  // 3. Insérer des produits (vous pouvez adapter en fonction de vos anciennes données)
  const products = await prisma.product.createMany({
    data: [
      {
        id: randomUUID(),
        label: 'Cheeseburger',
        price: 5.99,
        imageUrl: 'https://example.com/cheeseburger.jpg',
        available: true,
        productCategoryId: productCategories[0].id,
      },
      {
        id: randomUUID(),
        label: 'Coca Cola',
        price: 1.99,
        imageUrl: 'https://example.com/coca-cola.jpg',
        available: true,
        productCategoryId: productCategories[1].id,
      },
    ],
  });

  // 4. Insérer des ingrédients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      {
        id: randomUUID(),
        label: 'Cheese',
        price: 1.0,
        imageUrl: 'https://example.com/cheese.jpg',
        typeId: 1, // A définir selon votre ancien schéma
      },
      {
        id: randomUUID(),
        label: 'Lettuce',
        price: 0.5,
        imageUrl: 'https://example.com/lettuce.jpg',
        typeId: 2, // A définir selon votre ancien schéma
      },
    ],
  });

  // 5. Insérer des relations entre ingrédients et produits
  const ingredientInProducts = await prisma.ingredientInProduct.createMany({
    data: [
      {
        id: randomUUID(),
        ingredientId: ingredients[0].id,
        productId: products[0].id,
        composition: 'BASE', // ou 'EXTRA' selon le cas
      },
      {
        id: randomUUID(),
        ingredientId: ingredients[1].id,
        productId: products[0].id,
        composition: 'EXTRA',
      },
    ],
  });

  // Affichage pour vérifier que tout a été inséré
  console.log({
    users,
    productCategories,
    products,
    ingredients,
    ingredientInProducts,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
