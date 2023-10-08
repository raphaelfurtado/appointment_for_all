import React from "react";
import styles from "./styles.module.scss";

interface TimeProps{
    hour: string;
    calaborator: string;
    status: string;
}

export default function Time({hour, calaborator, status}: TimeProps) {

    let colorHour = status === "available" ? "#999" : "#7159c1";
    let colorColaborador = status === "available" ? "#999" : "#666";
    let colorCard = status === "past" ? "0.6" : "1";

    return (
        <div className={styles.time} style={{opacity: colorCard}}>
            <strong style={{color: colorHour}}>{hour}</strong>
            <span style={{color: colorColaborador}}>{calaborator}</span>
        </div>
    );
}