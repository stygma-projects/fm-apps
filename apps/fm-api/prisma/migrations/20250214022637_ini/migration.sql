/*
  Warnings:

  - You are about to drop the column `typeId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `_IngredientToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_IngredientToProduct` DROP FOREIGN KEY `_IngredientToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_IngredientToProduct` DROP FOREIGN KEY `_IngredientToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `typeId`;

-- AlterTable
ALTER TABLE `IngredientInProduct` ADD COLUMN `mandatory` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Product` MODIFY `available` BOOLEAN NULL DEFAULT true;

-- DropTable
DROP TABLE `_IngredientToProduct`;
