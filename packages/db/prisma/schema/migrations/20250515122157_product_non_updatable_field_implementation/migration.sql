-- CreateTable
CREATE TABLE `_nonUpdatable` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_nonUpdatable_AB_unique`(`A`, `B`),
    INDEX `_nonUpdatable_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_nonUpdatable` ADD CONSTRAINT `_nonUpdatable_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_nonUpdatable` ADD CONSTRAINT `_nonUpdatable_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
