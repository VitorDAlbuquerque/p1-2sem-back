-- AlterTable
ALTER TABLE "WatchList" ADD COLUMN     "banner" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "isLiked" (
    "userId" TEXT NOT NULL,
    "watchListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "isLiked_pkey" PRIMARY KEY ("watchListId","userId")
);

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "WatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
