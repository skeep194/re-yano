/*
  Warnings:

  - Added the required column `expectedRank` to the `ObserveRankGame` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ObserveRankGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erId" INTEGER NOT NULL,
    "systemUserid" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WATCHING',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batPoint" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "expectedRank" INTEGER NOT NULL,
    CONSTRAINT "ObserveRankGame_systemUserid_fkey" FOREIGN KEY ("systemUserid") REFERENCES "SystemUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ObserveRankGame" ("batPoint", "channelId", "createAt", "erId", "id", "status", "systemUserid") SELECT "batPoint", "channelId", "createAt", "erId", "id", "status", "systemUserid" FROM "ObserveRankGame";
DROP TABLE "ObserveRankGame";
ALTER TABLE "new_ObserveRankGame" RENAME TO "ObserveRankGame";
CREATE UNIQUE INDEX "ObserveRankGame_erId_systemUserid_key" ON "ObserveRankGame"("erId", "systemUserid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
