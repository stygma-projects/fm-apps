import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Insert admin user
  const passwordHash = await hash('admin', 10);

  // Insert ingredient types
  await prisma.ingredientType.createMany({
    data: [
      { label: 'Légumes' },
      { label: 'Produits laitier' },
      { label: 'Viande' },
      { label: 'Pain' },
      { label: 'Sauce' },
      { label: 'Cuisson' },
      { label: 'Condiment' },
      { label: 'Plat' },
      { label: 'Fromage' },
      { label: 'Gratiné' },
      { label: 'Féculents' }
    ],
    skipDuplicates: true,
  });

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
