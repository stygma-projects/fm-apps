/*
  Warnings:

  - You are about to drop the column `priceExclTax` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Ingredient` ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0.0,
    MODIFY `priceExclTax` DOUBLE NULL,
    MODIFY `priceIncludingTax` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `priceExclTax`,
    ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0.0,
    ADD COLUMN `priceExcludingTax` DOUBLE NULL,
    MODIFY `priceIncludingTax` DOUBLE NULL;
