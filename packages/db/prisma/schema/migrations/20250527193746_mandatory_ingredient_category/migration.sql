-- DropForeignKey
ALTER TABLE `_mandatory` DROP FOREIGN KEY `_mandatory_A_fkey`;

-- AddForeignKey
ALTER TABLE `_mandatory` ADD CONSTRAINT `_mandatory_A_fkey` FOREIGN KEY (`A`) REFERENCES `IngredientCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
