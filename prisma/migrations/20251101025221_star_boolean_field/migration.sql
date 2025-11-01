/*
  Warnings:

  - You are about to drop the `Star` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Star" DROP CONSTRAINT "Star_snippetId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Star" DROP CONSTRAINT "Star_userId_fkey";

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."Star";
