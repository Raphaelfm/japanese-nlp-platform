/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TextAnalysis` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TextAnalysis` table without a default value. This is not possible if the table is not empty.
  - Made the column `sentiment` on table `TextAnalysis` required. This step will fail if there are existing NULL values in that column.
  - Made the column `translated` on table `TextAnalysis` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TextAnalysis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "translated" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "TextAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TextAnalysis" ("id", "sentiment", "text", "translated") SELECT "id", "sentiment", "text", "translated" FROM "TextAnalysis";
DROP TABLE "TextAnalysis";
ALTER TABLE "new_TextAnalysis" RENAME TO "TextAnalysis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
