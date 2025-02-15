/*
  Warnings:

  - Made the column `ingredientTypeId` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_ingredientTypeId_fkey`;

-- AlterTable
ALTER TABLE `Ingredient` MODIFY `ingredientTypeId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_ingredientTypeId_fkey` FOREIGN KEY (`ingredientTypeId`) REFERENCES `IngredientType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
