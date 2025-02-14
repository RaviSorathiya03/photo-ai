/*
  Warnings:

  - Added the required column `status` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "FalAiRequestId" TEXT,
ADD COLUMN     "status" "Status" NOT NULL,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "OutputImage" ADD COLUMN     "falAiRequestId" TEXT;
