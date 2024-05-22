/*
  Warnings:

  - Added the required column `name` to the `ItemInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemInventory" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Adjustment" (
    "id" SERIAL NOT NULL,
    "itemInventoryId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adjustment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adjustment" ADD CONSTRAINT "Adjustment_itemInventoryId_fkey" FOREIGN KEY ("itemInventoryId") REFERENCES "ItemInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
