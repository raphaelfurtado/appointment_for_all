import { Request, Response } from "express";
import { ListAvailableService } from "../../services/available/ListAvailableService";
import { format, setHours, setMinutes, setSeconds, isAfter } from "date-fns";

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

        // horários de trabalho do provedor
        const schedule = [
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
        ];

        const serviceTime = [
            "00:40",
            "00:30"
        ]

        const available = schedule.map(time => {
            const [hour, minute] = time.split(":");
            const value = setSeconds(setMinutes(setHours(searchDate, Number(hour)), Number(minute)),
                0);

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