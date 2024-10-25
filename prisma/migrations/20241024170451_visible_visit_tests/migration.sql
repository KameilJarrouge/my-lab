-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VisitTest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "units" DECIMAL NOT NULL,
    "price" DECIMAL NOT NULL,
    "template" TEXT NOT NULL,
    "visitId" INTEGER,
    "testId" INTEGER,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "VisitTest_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VisitTest_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VisitTest" ("id", "price", "template", "testId", "units", "visitId") SELECT "id", "price", "template", "testId", "units", "visitId" FROM "VisitTest";
DROP TABLE "VisitTest";
ALTER TABLE "new_VisitTest" RENAME TO "VisitTest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
