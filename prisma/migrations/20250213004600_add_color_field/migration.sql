/*
  Warnings:

  - Added the required column `color` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "color" TEXT NOT NULL;
