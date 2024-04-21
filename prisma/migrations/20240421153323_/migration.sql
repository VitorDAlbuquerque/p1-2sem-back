-- CreateTable
CREATE TABLE "assessment" (
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "note" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("movieId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "assessment_movieId_key" ON "assessment"("movieId");

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
