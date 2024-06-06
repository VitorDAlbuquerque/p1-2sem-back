-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT 'Bio.',
    "birthDate" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "theme" TEXT NOT NULL DEFAULT '#fff',
    "imgIndex" INTEGER NOT NULL DEFAULT 0,
    "isADM" BOOLEAN NOT NULL DEFAULT false,

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

-- CreateTable
CREATE TABLE "isSaved" (
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "movieName" TEXT NOT NULL,
    "movieIMG" TEXT NOT NULL,

    CONSTRAINT "isSaved_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "watchListId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "movieIMG" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_pkey" PRIMARY KEY ("movieId","userId")
);

-- CreateTable
CREATE TABLE "isFollow" (
    "userFollowedId" TEXT NOT NULL,
    "userFollowingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "isFollow_pkey" PRIMARY KEY ("userFollowingId","userFollowedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

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

-- AddForeignKey
ALTER TABLE "isSaved" ADD CONSTRAINT "isSaved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_watchListId_fkey" FOREIGN KEY ("watchListId") REFERENCES "WatchList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isFollow" ADD CONSTRAINT "isFollow_userFollowedId_fkey" FOREIGN KEY ("userFollowedId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "isFollow" ADD CONSTRAINT "isFollow_userFollowingId_fkey" FOREIGN KEY ("userFollowingId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
