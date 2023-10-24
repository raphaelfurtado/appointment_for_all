import React from "react";

interface TimeProps {
    hour: string;
    calaborator: string;
    status: boolean;
    past: boolean;
}

export default function Time({ hour, calaborator, status, past }: TimeProps) {

    const hourClasses = status ? "text-gray-500" : "text-indigo-700";
    const colabClasses = status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700";

    return (
        <>
            <div className="lg:col-span-1 col-span-1 bg-white flex justify-center w-full border p-4 rounded-lg">
                <div className="flex flex-col w-full pb-4">
                    <p className={`text-2x1 font-bold ${hourClasses}`}>{hour} </p>
                </div>
                <p className={`${colabClasses} flex justify-center items-center p-2 rounded-lg`}>
                    <span className={`${colabClasses} text-lg`}>{calaborator}</span>
                </p>
            </div>
        </>
    );
}