import React from "react";

interface IndicatorProps {
    active: boolean;
}

export default function Indicators({ active }: IndicatorProps) {

    const bgGround = active ? "bg-green-100" : "bg-red-100";
    const text = active ? "text-green-800" : "text-red-800";
    const bgGroundSpan = active ? "bg-green-500" : "bg-red-500";
    const label = active ? "Ativo" : "Inativo";

    return (
        <>
            <ul role="list" className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className={`inline-flex items-center ${bgGround} ${text} text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300`}>
                            <span className={`w-2 h-2 me-1 ${bgGroundSpan} rounded-full`}></span>
                            {label}
                        </span>
                    </div>
                </li>
            </ul>

        </>
    );
}