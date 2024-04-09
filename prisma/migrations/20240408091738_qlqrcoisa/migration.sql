-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedMovies" (
    "id" TEXT NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "WatchlistId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "movieName" TEXT NOT NULL,
    "movieURLImg" TEXT NOT NULL,

    CONSTRAINT "SavedMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "privacy" BOOLEAN NOT NULL,
    "banner" TEXT NOT NULL DEFAULT '',
    "createDate" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "numberLikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "isLiked" (
    "userId" TEXT NOT NULL,
    "watchListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "isLiked_pkey" PRIMARY KEY ("watchListId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "SavedMovies" ADD CONSTRAINT "SavedMovies_WatchlistId_fkey" FOREIGN KEY ("WatchlistId") REFERENCES "WatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isLiked" ADD CONSTRAINT "isLiked_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "WatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
