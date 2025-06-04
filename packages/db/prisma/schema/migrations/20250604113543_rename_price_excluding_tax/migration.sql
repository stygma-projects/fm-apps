/*
  Warnings:

  - You are about to drop the column `priceExcludingTax` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `priceExcludingTax`,
    ADD COLUMN `priceExclTax` DOUBLE NULL;
