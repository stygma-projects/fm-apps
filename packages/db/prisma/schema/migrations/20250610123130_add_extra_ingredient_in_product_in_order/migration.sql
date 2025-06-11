/*
  Warnings:

  - You are about to drop the `_usedAsExtraIn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_usedAsExtraIn` DROP FOREIGN KEY `_usedAsExtraIn_A_fkey`;

-- DropForeignKey
ALTER TABLE `_usedAsExtraIn` DROP FOREIGN KEY `_usedAsExtraIn_B_fkey`;

-- DropTable
DROP TABLE `_usedAsExtraIn`;

-- CreateTable
CREATE TABLE `ExtraIngredientInProductOrder` (
    `id` VARCHAR(191) NOT NULL,
    `productInOrderId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `ExtraIngredientInProductOrder_productInOrderId_ingredientId_key`(`productInOrderId`, `ingredientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExtraIngredientInProductOrder` ADD CONSTRAINT `ExtraIngredientInProductOrder_productInOrderId_fkey` FOREIGN KEY (`productInOrderId`) REFERENCES `ProductInOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtraIngredientInProductOrder` ADD CONSTRAINT `ExtraIngredientInProductOrder_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
