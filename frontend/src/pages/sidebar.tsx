import React, { useState } from "react";
import { RxSketchLogo } from "react-icons/rx";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart, AiFillSchedule, AiOutlineSchedule } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart, FiUsers } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {

    // const { data: session } = useSession();

    const menus = [
        { name: "Dashboard", link: "/app/dashboard", icon: MdOutlineDashboard, role: "ADMIN" },
        { name: "Meu Perfil", link: "/app/user", icon: AiOutlineUser, role: "ADMIN" },
        { name: "Usuários", link: "/app/users", icon: FiUsers, role: "ADMIN" },
        { name: "Meus agendamentos", link: "/myAppointments", icon: AiOutlineSchedule, role: "USER" },
        { name: "Agendamentos", link: "/app/appointments", icon: AiOutlineSchedule, role: "ADMIN" },
        { name: "analytics", link: "/app/home", icon: TbReportAnalytics, margin: true, role: "ADMIN" },
        { name: "File Manager", link: "/app/home", icon: FiFolder, role: "USER" },
        { name: "Cart", link: "/app/home", icon: FiShoppingCart, role: "ADMIN" },
        { name: "Saved", link: "/app/home", icon: AiOutlineHeart, margin: true, role: "USER" },
        { name: "Setting", link: "/app/home", icon: RiSettings4Line, role: "ADMIN" },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div className="flex">
            <div className={`bg-white border-r-[1px] min-h-screen ${open ? "w-72" : "w-16"
                } duration-500 text-gray-100 px-4`}
            >
                <div className="flex flex-col items-center">
                    <Link href="/app/home">
                        <div className="bg-purple-800 text-white p-3 rounded-lg inline-block mt-5">
                            <RxSketchLogo size={20} />
                        </div>
                    </Link>
                    <span className="w-full p-2 
                    text-center
                     bg-blue-100
                      text-blue-800 
                      text-lg
                      font-medium 
                      px-2.5 
                      py-0.5 
                      rounded
                       dark:bg-blue-900 dark:text-blue-300">{open ? "Appointment" : "A"}</span>
                    <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
                </div>
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <>
                            

                                <Link
                                    href={menu?.link}
                                    key={i}
                                    className={` ${menu?.margin && "mt-4"
                                        } group flex items-center text-sm  gap-3.5 font-medium hover:bg-gray-200 rounded-md`}
                                >
                                    <div className="bg-gray-100 text-zinc-700 hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
                                        {React.createElement(menu?.icon, { size: "20" })}
                                    </div>
                                    <h2
                                        style={{ transitionDelay: `${i + 3}00ms`, }}
                                        className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                            }  text-zinc-700`}
                                    >
                                        {menu?.name}
                                    </h2>
                                    <h2
                                        className={`${open && "hidden"
                                            } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                                    >
                                        {menu?.name}
                                    </h2>
                                </Link>
                            
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};