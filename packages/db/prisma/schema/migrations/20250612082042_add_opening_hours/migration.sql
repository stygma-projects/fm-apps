-- CreateTable
CREATE TABLE `OpeningHour` (
    `id` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `endTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` VARCHAR(191) NOT NULL,
    `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL,
    `opened` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Schedule_day_key`(`day`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_usedInDay` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_usedInDay_AB_unique`(`A`, `B`),
    INDEX `_usedInDay_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_usedInDay` ADD CONSTRAINT `_usedInDay_A_fkey` FOREIGN KEY (`A`) REFERENCES `OpeningHour`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_usedInDay` ADD CONSTRAINT `_usedInDay_B_fkey` FOREIGN KEY (`B`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
