"use client"
import { useState } from "react";
import Image from "next/image";
import MenuLink from "./MenuLink";
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdPeople,
    MdOutlineSettings,
    MdArrowCircleLeft,
    MdArrowCircleRight,
    MdLogout
} from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";
import { IoPersonCircle } from "react-icons/io5";
import { logout } from "@/lib/actions";
//const SidebarContext = createContext()
const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },

            {
                title: "Patients",
                path: "/dashboard/patients",
                icon: <MdPeople />,
            },
            {
                title: "Appointments",
                path: "/dashboard/appointment",
                icon: <GrSchedules />,
            },
            {
                title: "Administration",
                path: "/dashboard/administration",
                icon: <MdSupervisedUserCircle />,
            },
        ],
    },
    {
        title: " IA & Analytics",
        list: [
            {
                title: "Assistant Chatbot",
                path: "/dashboard/chatbot",
                icon: <TbMessageChatbot />,
            },
        ],
    },
    {
        title: "Doctor Settings",
        list: [
            {
                title: "Profile",
                path: "/dashboard/profile",
                icon: <IoPersonCircle />,
            },
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings />,
            },


        ],
    },
];


const Sidebar = ({ onToggleSidebar }) => {

    const [expanded, setExpanded] = useState(true);

    const handleToggleSidebar = () => {
        setExpanded((curr) => !curr);
        onToggleSidebar(!expanded);
    };

    return (
        <div className="h-screen dark:bg-[#333] sticky top-0 mb-[20%] ">

            <div className="flex items-center">
                <Image
                    className={`object-cover overflow-hidden transition-all ${expanded ? "w-[220px]" : "w-0"
                        }`}
                    src={"/assets/images/kidneysansfond3.png"}
                    alt="Login logo image"
                    width="220"
                    height="10"
                />
            </div>
            <button
                onClick={handleToggleSidebar}
                className="absolute p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-[100%] mt-[15%]"
            >
                {expanded ? <MdArrowCircleLeft size={20} style={{ color: '#2B3674' }} /> : <MdArrowCircleRight size={14} style={{ color: '#2B3674' }} />}
            </button>
            {/* <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider> */}

            <ul className="list-none ">
                {menuItems.map((cat) => (
                    <li key={cat.title} className="mt-10">
                        <span className="text-[#2B3674] font-semibold dark:text-[#FFFFFF]">{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={{ ...item, expanded }} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <form
                action={logout}
            >
                <button className="logout mt-[15%] ">
                    <MdLogout size={15} className="dark:text-white" />
                    <div className={`${expanded ? 'visible' : 'hidden'}`}>Logout</div>
                </button>

            </form>

        </div>
    );
};


export default Sidebar;