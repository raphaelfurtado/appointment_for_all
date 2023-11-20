/*
  Warnings:

  - Added the required column `active` to the `categoryServices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoryServices" ADD COLUMN     "active" BOOLEAN NOT NULL;
