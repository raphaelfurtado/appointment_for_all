import React from "react";

interface TimeProps {
    hour: string;
    calaborator: string;
    status: boolean;
    past: boolean;
    email: string;
    phone?: string;
    nameService?: string;
    duration?: string;
}

export default function Time({ hour, calaborator, status, past, email, phone, nameService, duration }: TimeProps) {

    const hourClasses = status ? "text-gray-500" : "text-indigo-700";
    const colabClasses = status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700";

    return (
        <>

            <div
                className={`block rounded-lg ${colabClasses} shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`}>
                <h5
                    className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
                    {hour}
                </h5>
                <div className="p-6">
                    <h5
                        className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {calaborator}
                    </h5>
                    {
                        !status ?
                            <>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Contato: {email}
                                </p>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Tel.: {phone}
                                </p>
                                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Serviço: {nameService} | Duração: {duration}
                                </p>
                            </>
                            :
                            ""
                    }

                </div>
            </div>
        </>
    );
}