-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ErArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thumbnailUrl" TEXT,
    "createAt" DATETIME NOT NULL,
    "updateAt" DATETIME NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL
);
INSERT INTO "new_ErArticle" ("createAt", "id", "summary", "thumbnailUrl", "title", "updateAt", "url") SELECT "createAt", "id", "summary", "thumbnailUrl", "title", "updateAt", "url" FROM "ErArticle";
DROP TABLE "ErArticle";
ALTER TABLE "new_ErArticle" RENAME TO "ErArticle";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
