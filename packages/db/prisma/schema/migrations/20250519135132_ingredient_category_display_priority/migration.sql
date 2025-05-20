/*
  Warnings:

  - A unique constraint covering the columns `[displayPriority]` on the table `IngredientCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayPriority` to the `IngredientCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `IngredientCategory` ADD COLUMN `displayPriority` DOUBLE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `IngredientCategory_displayPriority_key` ON `IngredientCategory`(`displayPriority`);
