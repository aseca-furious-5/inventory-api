-- CreateTable
CREATE TABLE "ItemInventory" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemInventory_pkey" PRIMARY KEY ("id")
);
