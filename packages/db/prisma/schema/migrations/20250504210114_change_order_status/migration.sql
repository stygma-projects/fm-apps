/*
  Warnings:

  - You are about to alter the column `status` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `status` ENUM('IN_DRAFT', 'WAITING_FOR_PAYMENT', 'IN_PROGRESS', 'DELIVERED', 'CANCELED') NOT NULL DEFAULT 'IN_DRAFT';
