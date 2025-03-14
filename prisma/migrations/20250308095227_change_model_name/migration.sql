/*
  Warnings:

  - You are about to drop the `ERArticle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ERArticle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ErArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnailUrl" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
