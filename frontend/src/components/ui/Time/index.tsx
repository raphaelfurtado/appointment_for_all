import React from "react";
import styles from "./styles.module.scss";

interface TimeProps{
    hour: string;
    calaborator: string;
    status: boolean;
    past: boolean;
}

export default function Time({hour, calaborator, status, past}: TimeProps) {

    let colorHour = "";
    let colorColaborador = "";
    let colorCard = "";

    if(status){
        colorHour = "#999";
        colorColaborador = "#999";
    } else {
        colorHour = "#7159c1";
        colorColaborador = "#666";
    }
    
    if(past){
        colorCard = "0.6";
    } else {
        colorCard = "1";
    }

    return (
        <div className={styles.time} style={{opacity: colorCard}}>
            <strong style={{color: colorHour}}>{hour}</strong>
            <span style={{color: colorColaborador}}>{calaborator}</span>
        </div>
    );
}