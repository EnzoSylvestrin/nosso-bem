/*
  Warnings:

  - You are about to drop the column `userId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_userId_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "userId",
ADD COLUMN     "userData" JSONB;

-- DropTable
DROP TABLE "users";
