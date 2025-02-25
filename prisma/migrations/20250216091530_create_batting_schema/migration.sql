-- CreateTable
CREATE TABLE "SystemUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "point" INTEGER NOT NULL DEFAULT 1000,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT,
    "lastAttendanceTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ObserveRankGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erId" INTEGER NOT NULL,
    "systemUserid" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WATCHING',
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batPoint" INTEGER NOT NULL,
    CONSTRAINT "ObserveRankGame_systemUserid_fkey" FOREIGN KEY ("systemUserid") REFERENCES "SystemUser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemUser_discordId_guildId_key" ON "SystemUser"("discordId", "guildId");

-- CreateIndex
CREATE UNIQUE INDEX "ObserveRankGame_erId_systemUserid_key" ON "ObserveRankGame"("erId", "systemUserid");
