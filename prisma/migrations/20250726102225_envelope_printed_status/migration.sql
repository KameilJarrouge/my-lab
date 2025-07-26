-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER,
    "doctorId" INTEGER NOT NULL,
    "testPrinted" BOOLEAN NOT NULL DEFAULT false,
    "billPrinted" BOOLEAN NOT NULL DEFAULT false,
    "envelopePrinted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Visit_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Visit" ("billPrinted", "date", "doctorId", "id", "patientId", "testPrinted") SELECT "billPrinted", "date", "doctorId", "id", "patientId", "testPrinted" FROM "Visit";
DROP TABLE "Visit";
ALTER TABLE "new_Visit" RENAME TO "Visit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
