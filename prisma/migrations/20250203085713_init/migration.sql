-- CreateTable
CREATE TABLE "DiscordERUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "discordId" TEXT NOT NULL,
    "guildId" TEXT,
    "erId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordERUser_discordId_erId_guildId_key" ON "DiscordERUser"("discordId", "erId", "guildId");
