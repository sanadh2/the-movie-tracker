-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "tmdbID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "tmdbID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "tmdbID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watched" (
    "id" TEXT NOT NULL,
    "tmdbID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Watched_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbID_key" ON "Movie"("tmdbID");

-- CreateIndex
CREATE UNIQUE INDEX "Review_tmdbID_userID_key" ON "Review"("tmdbID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_tmdbID_userID_key" ON "Favorite"("tmdbID", "userID");

-- CreateIndex
CREATE UNIQUE INDEX "Watched_tmdbID_userID_key" ON "Watched"("tmdbID", "userID");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tmdbID_fkey" FOREIGN KEY ("tmdbID") REFERENCES "Movie"("tmdbID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_tmdbID_fkey" FOREIGN KEY ("tmdbID") REFERENCES "Movie"("tmdbID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watched" ADD CONSTRAINT "Watched_tmdbID_fkey" FOREIGN KEY ("tmdbID") REFERENCES "Movie"("tmdbID") ON DELETE RESTRICT ON UPDATE CASCADE;
