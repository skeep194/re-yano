/*
  Warnings:

  - You are about to drop the column `erId` on the `DiscordERUser` table. All the data in the column will be lost.
  - Added the required column `erNickName` to the `DiscordERUser` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscordERUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT,
    "erNickName" TEXT NOT NULL
);
INSERT INTO "new_DiscordERUser" ("discordId", "guildId", "id") SELECT "discordId", "guildId", "id" FROM "DiscordERUser";
DROP TABLE "DiscordERUser";
ALTER TABLE "new_DiscordERUser" RENAME TO "DiscordERUser";
CREATE UNIQUE INDEX "DiscordERUser_discordId_erNickName_guildId_key" ON "DiscordERUser"("discordId", "erNickName", "guildId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
