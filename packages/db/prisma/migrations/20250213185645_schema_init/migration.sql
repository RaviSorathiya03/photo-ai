/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `Ethinicity` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Ethinicity_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middel Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethinicity" TYPE "Ethinicity_new" USING ("ethinicity"::text::"Ethinicity_new");
ALTER TYPE "Ethinicity" RENAME TO "Ethinicity_old";
ALTER TYPE "Ethinicity_new" RENAME TO "Ethinicity";
DROP TYPE "Ethinicity_old";
COMMIT;
