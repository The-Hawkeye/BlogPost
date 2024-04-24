-- DropIndex
DROP INDEX `Blogs_authorId_fkey` ON `Blogs`;

-- DropIndex
DROP INDEX `Comment_authorId_fkey` ON `Comment`;

-- AlterTable
ALTER TABLE `Blogs` ADD COLUMN `commentCount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
