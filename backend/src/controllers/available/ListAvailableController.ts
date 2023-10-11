import { Request, Response } from "express";
import { ListAvailableService } from "../../services/available/ListAvailableService";
import { format, setHours, setMinutes, setSeconds, isAfter } from "date-fns";
import prismaClient from "../../prisma";

class ListAvailableController {
    async handle(req: Request, res: Response) {

        const { date } = req.query;
        const providerId = req.params.providerId;

        if (!date) return res.status(400).json({ error: "Invalid date" });

        const searchDate = Number(date);

        const availableService = new ListAvailableService();

        const appointmentsAvailable = await availableService.execute({
            idProvider: Number(providerId),
            date: searchDate
        });

        const employeeWorkSchedule = await prismaClient.employeeWorkSchedule.findMany({
            where: {
                userId: Number(providerId),
                dayOfWeek: String(3)
            }
        });

        const schedule = [];

        employeeWorkSchedule.forEach(hours => {
            const startTime = parseInt(hours.startTime.split(":")[0]);
            const endTime = parseInt(hours.endTime.split(":")[0]);
            const breakStart = parseInt(hours.breakStart.split(":")[0]);
            const breakEnd = parseInt(hours.breakEnd.split(":")[0]);

            console.log(hours.dayOfWeek)

            for (let i = startTime; i <= endTime; i++) {
                if (!(i >= breakStart && i < breakEnd)) {
                    schedule.push(`${i.toString().padStart(2, '0')}:00`);
                }
            }
        });

        const available = schedule.map(time => {
            const [hour, minute] = time.split(":");
            const value = setSeconds(setMinutes(setHours(searchDate, Number(hour)), Number(minute)), 0);

            // console.log("###", format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"));

            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                available: isAfter(value, new Date()) &&
                    !appointmentsAvailable.find(appointment => format(appointment.date, "HH:mm") === time)

            }
        });

        return res.json(available);
    }
}

export { ListAvailableController }