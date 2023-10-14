import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Header from "../../../pages/header";
import styles from "./stylesProvider.module.scss";
import Time from "../Time";

import { useContext, useEffect, useMemo, useState } from "react";
import { format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore, isEqual, parseISO, setMilliseconds } from "date-fns";
import { pt } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";
import { api } from "../../../services/apiClient";

// Pode retornar do backend - range de horários
const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

type ScheduleItem = {
    time: string;
    past: boolean;
    appointment: any;
};

export default function Provider() {

    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [date, setDate] = useState(new Date);

    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get("/schedules", {
                params: { date }
            });

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const startTime = "08:00";
            const endTime = "20:00";
            const increment = 40;

            const timeRange = [];
            let currentTime = startTime;

            while (currentTime <= endTime) {
                timeRange.push(currentTime);
                const [hours, minutes] = currentTime.split(":").map(Number);
                const nextMinutes = minutes + increment;
                const nextHours = hours + Math.floor(nextMinutes / 60);
                currentTime = `${nextHours.toString().padStart(2, "0")}:${(nextMinutes % 60).toString().padStart(2, "0")}`;
            }

            const dataRange = timeRange.map(hour => {
                const checkDate = setMilliseconds(setSeconds(setMinutes(setHours(date, Number(hour)), 0), 0), 0);
                const compareDate = utcToZonedTime(checkDate, timezone);

                return {
                    time: `${hour}`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find((a: { date: string; }) =>
                        isEqual(parseISO(a.date), compareDate),
                    )
                }
            });

            setSchedule(dataRange);
        }
        loadSchedule();
    }, [date]);

    function handlePrevDay() {
        setDate(subDays(date, 1));
    }

    function handleNextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div>
                    <button type="button" onClick={handlePrevDay}>
                        <MdChevronLeft size={36} color="#FFF" />
                    </button>
                    <strong>{dateFormatted}</strong>
                    <button type="button" onClick={handleNextDay}>
                        <MdChevronRight size={36} color="#FFF" />
                    </button>
                </div>
            </div>
            <div className={styles.containerTimer}>
                <ul>
                    {
                        schedule.map(time => {
                            if (!time.past) {
                                return (
                                    <Time
                                        key={time.time}
                                        hour={time.time}
                                        calaborator={time.appointment ? time.appointment.user.name : "Em aberto"}
                                        status={!time.appointment}
                                        past={time.past}
                                    />
                                );
                            }
                            return null; // ou renderize algo diferente se necessário
                        })
                    }

                </ul>
            </div>
        </div>
    );
}