/*
  Warnings:

  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_username_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "username",
ADD COLUMN     "birthDate" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SavedMovies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "MovieID" TEXT NOT NULL,

    CONSTRAINT "SavedMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "privacy" BOOLEAN NOT NULL,
    "createDate" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "SavedMovies" ADD CONSTRAINT "SavedMovies_MovieID_fkey" FOREIGN KEY ("MovieID") REFERENCES "WatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
