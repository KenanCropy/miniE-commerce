/*
  Warnings:

  - You are about to drop the column `productCount` on the `UserBasket` table. All the data in the column will be lost.
  - You are about to drop the column `productPrice` on the `UserBasket` table. All the data in the column will be lost.
  - Added the required column `count` to the `UserBasket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `UserBasket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBasket" DROP COLUMN "productCount",
DROP COLUMN "productPrice",
ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
