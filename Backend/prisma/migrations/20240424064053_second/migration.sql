/*
  Warnings:

  - Added the required column `author` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Blogs` DROP FOREIGN KEY `Blogs_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_authorId_fkey`;

-- DropIndex
DROP INDEX `Comment_postId_fkey` ON `Comment`;

-- AlterTable
ALTER TABLE `Blogs` ADD COLUMN `author` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `author` VARCHAR(191) NOT NULL;
