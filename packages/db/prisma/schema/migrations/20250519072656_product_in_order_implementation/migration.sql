/*
  Warnings:

  - You are about to drop the `_OrderToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_OrderToProduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_OrderToProduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- DropTable
DROP TABLE `_OrderToProduct`;

-- CreateTable
CREATE TABLE `ProductInOrder` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usedAsMandatoryIn` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_usedAsMandatoryIn_AB_unique`(`A`, `B`),
    INDEX `_usedAsMandatoryIn_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usedAsOptionalBaseIn` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_usedAsOptionalBaseIn_AB_unique`(`A`, `B`),
    INDEX `_usedAsOptionalBaseIn_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usedAsExtraIn` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_usedAsExtraIn_AB_unique`(`A`, `B`),
    INDEX `_usedAsExtraIn_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductInOrder` ADD CONSTRAINT `ProductInOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsMandatoryIn` ADD CONSTRAINT `_usedAsMandatoryIn_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsMandatoryIn` ADD CONSTRAINT `_usedAsMandatoryIn_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductInOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsOptionalBaseIn` ADD CONSTRAINT `_usedAsOptionalBaseIn_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsOptionalBaseIn` ADD CONSTRAINT `_usedAsOptionalBaseIn_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductInOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsExtraIn` ADD CONSTRAINT `_usedAsExtraIn_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedAsExtraIn` ADD CONSTRAINT `_usedAsExtraIn_B_fkey` FOREIGN KEY (`B`) REFERENCES `ProductInOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
