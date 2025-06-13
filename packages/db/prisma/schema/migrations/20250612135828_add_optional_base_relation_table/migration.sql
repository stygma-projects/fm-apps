/*
  Warnings:

  - You are about to drop the `_usedAsOptionalBaseIn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_usedAsOptionalBaseIn` DROP FOREIGN KEY `_usedAsOptionalBaseIn_A_fkey`;

-- DropForeignKey
ALTER TABLE `_usedAsOptionalBaseIn` DROP FOREIGN KEY `_usedAsOptionalBaseIn_B_fkey`;

-- DropTable
DROP TABLE `_usedAsOptionalBaseIn`;

-- CreateTable
CREATE TABLE `OptionalBaseIngredientInProductOrder` (
    `id` VARCHAR(191) NOT NULL,
    `productInOrderId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `isSelected` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `OptionalBaseIngredientInProductOrder_productInOrderId_ingred_key`(`productInOrderId`, `ingredientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OptionalBaseIngredientInProductOrder` ADD CONSTRAINT `OptionalBaseIngredientInProductOrder_productInOrderId_fkey` FOREIGN KEY (`productInOrderId`) REFERENCES `ProductInOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OptionalBaseIngredientInProductOrder` ADD CONSTRAINT `OptionalBaseIngredientInProductOrder_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
