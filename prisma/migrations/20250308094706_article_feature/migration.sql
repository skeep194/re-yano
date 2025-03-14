-- CreateTable
CREATE TABLE "ERArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnailUrl" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ArticleSubscribe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleSubscribe_channelId_key" ON "ArticleSubscribe"("channelId");
