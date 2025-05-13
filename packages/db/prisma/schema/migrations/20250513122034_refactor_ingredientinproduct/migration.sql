/*
  Warnings:

  - You are about to drop the `IngredientInProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `IngredientInProduct` DROP FOREIGN KEY `IngredientInProduct_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `IngredientInProduct` DROP FOREIGN KEY `IngredientInProduct_productId_fkey`;

-- DropTable
DROP TABLE `IngredientInProduct`;

-- CreateTable
CREATE TABLE `_mandatory` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_mandatory_AB_unique`(`A`, `B`),
    INDEX `_mandatory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_optionnalBase` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_optionnalBase_AB_unique`(`A`, `B`),
    INDEX `_optionnalBase_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_extra` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_extra_AB_unique`(`A`, `B`),
    INDEX `_extra_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_mandatory` ADD CONSTRAINT `_mandatory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_mandatory` ADD CONSTRAINT `_mandatory_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionnalBase` ADD CONSTRAINT `_optionnalBase_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_optionnalBase` ADD CONSTRAINT `_optionnalBase_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_extra` ADD CONSTRAINT `_extra_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_extra` ADD CONSTRAINT `_extra_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
