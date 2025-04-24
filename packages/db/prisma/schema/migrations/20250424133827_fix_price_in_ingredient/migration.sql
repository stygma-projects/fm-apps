/*
  Warnings:

  - You are about to drop the column `price` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `priceExclTax` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceIncludingTax` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ingredient` DROP COLUMN `price`,
    ADD COLUMN `priceExclTax` DOUBLE NOT NULL,
    ADD COLUMN `priceIncludingTax` DOUBLE NOT NULL;
