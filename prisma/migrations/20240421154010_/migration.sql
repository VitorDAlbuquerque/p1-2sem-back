/*
  Warnings:

  - Added the required column `movieBanner` to the `assessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "assessment" ADD COLUMN     "movieBanner" TEXT NOT NULL;
