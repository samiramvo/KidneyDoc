"use client";
import { useState } from "react";
import MenuLink from "./MenuLink";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdPeople,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import Image from "next/image";
// import InformationuserClient from "./informationuserclient";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { GrSchedules } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";
import { logout } from "@/lib/actions";
import Spinner from "@/components/Spinner";
import { User2 } from "lucide-react";
import TranslatedContent from "./TranslateContent";
const menuItems = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
      { title: "Patients", path: "/dashboard/patients", icon: <MdPeople /> },
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
    title: "IA & Analytics",
    list: [
      {
        title: "Analysis Data",
        path: "/dashboard/data-analysis",
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

const SidebarClient = ({ user }) => {
  const { expanded } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  const sidebarClass = expanded ? "p-[25px] w-64" : "w-24 p-[20px]";

  const filteredMenuItems = menuItems.map((category) => ({
    ...category,
    list: category.list.filter(
      (item) => !(item.title === "Administration" && !user.isAdmin)
    ),
  }));
  return (
    <div
      className={`h-full bg-background dark:bg-darkbackground dark:border-r-black p-4 border-r border-solid border-r-[#EEEFF2] font-jakarta ${sidebarClass} `}
    >
      <div className="w-full max-h-screens">
        <div className="usercontainer">
          {user?.img ? (
            <Image
              src={user?.img}
              alt={user?.username || "default user"}
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <User2
              width={25}
              height={25}
              className="bg-background text-violettitle rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
            />
          )}
          <div className="userDetail">
            <span className="username capitalize dark:text-white">
              Dr {user?.username || "Unknown"}
            </span>
            {user?.isAdmin ? (
              <span className="userTitle">Administrator</span>
            ) : (
              <span className="userTitle">Doctor</span>
            )}
          </div>
        </div>
        <ul className="list-none mt-6">
          {filteredMenuItems.map((cat) => (
            <li key={cat.title} className="mt-10">
              <span className="text-textPrimary font-semibold dark:text-white">
              <TranslatedContent translationKey={cat.title.toLowerCase()} />
              </span>
              {cat.list.map((item) => (
                <MenuLink item={{ ...item, expanded }} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
        <form onSubmit={handleLogout}>
          <button className=" mt-10 flex items-center">
            <MdLogout size={15} className="text-textPrimary dark:text-white" />
            <div className={`${expanded ? "ml-2" : "hidden"}`}><TranslatedContent translationKey="logout" /></div>
          </button>
          {isLoading && <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default SidebarClient;
