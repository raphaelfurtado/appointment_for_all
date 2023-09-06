/*
  Warnings:

  - You are about to drop the `_AppointmentsToServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentsToServices" DROP CONSTRAINT "_AppointmentsToServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentsToServices" DROP CONSTRAINT "_AppointmentsToServices_B_fkey";

-- DropTable
DROP TABLE "_AppointmentsToServices";

-- CreateTable
CREATE TABLE "AppointmentsServices" (
    "id" SERIAL NOT NULL,
    "appointment_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "AppointmentsServices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentsServices" ADD CONSTRAINT "AppointmentsServices_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsServices" ADD CONSTRAINT "AppointmentsServices_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
