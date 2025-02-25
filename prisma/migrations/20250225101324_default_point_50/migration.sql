-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SystemUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" INTEGER NOT NULL DEFAULT 50,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT,
    "lastAttendanceTime" DATETIME NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00'
);
INSERT INTO "new_SystemUser" ("discordId", "guildId", "id", "lastAttendanceTime", "point") SELECT "discordId", "guildId", "id", "lastAttendanceTime", "point" FROM "SystemUser";
DROP TABLE "SystemUser";
ALTER TABLE "new_SystemUser" RENAME TO "SystemUser";
CREATE UNIQUE INDEX "SystemUser_discordId_guildId_key" ON "SystemUser"("discordId", "guildId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
