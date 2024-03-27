/*
  Warnings:

  - Added the required column `movieName` to the `SavedMovies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieURLImg` to the `SavedMovies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedMovies" ADD COLUMN     "movieName" TEXT NOT NULL,
ADD COLUMN     "movieURLImg" TEXT NOT NULL;
