/*
  Warnings:

  - You are about to drop the column `ingredientTypeId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `IngredientType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `available` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_ingredientTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_productCategoryId_fkey`;

-- DropIndex
DROP INDEX `Ingredient_ingredientTypeId_fkey` ON `Ingredient`;

-- DropIndex
DROP INDEX `Product_productCategoryId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `ingredientTypeId`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    ALTER COLUMN `price` DROP DEFAULT;

-- AlterTable
ALTER TABLE `IngredientInProduct` MODIFY `composition` ENUM('BASE', 'EXTRA') NOT NULL DEFAULT 'BASE';

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productCategoryId`,
    ADD COLUMN `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `available` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'USER', 'CUSTOMER') NOT NULL DEFAULT 'CUSTOMER';

-- DropTable
DROP TABLE `IngredientType`;

-- CreateTable
CREATE TABLE `IngredientCategory` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `IngredientCategory_label_key`(`label`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('DELIVERY', 'PICKUP', 'TERMINALS') NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `withdrawalMethod` ENUM('CASH', 'CARD') NOT NULL,
    `terminalId` INTEGER NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `IngredientCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
