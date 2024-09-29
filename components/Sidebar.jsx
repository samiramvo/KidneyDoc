// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import MenuLink from "./MenuLink";
// import {
//   MdDashboard,
//   MdSupervisedUserCircle,
//   MdPeople,
//   MdOutlineSettings,
//   MdArrowCircleLeft,
//   MdArrowCircleRight,
//   MdLogout,
// } from "react-icons/md";
// import { GrSchedules } from "react-icons/gr";
// import { TbMessageChatbot } from "react-icons/tb";
// import { IoPersonCircle } from "react-icons/io5";
// import { logout } from "@/lib/actions";
// import Spinner from "@/components/Spinner";
// // import InformationuserClient from "./informationuserclient";
// //const SidebarContext = createContext()
// const menuItems = [
//   {
//     title: "Pages",
//     list: [
//       {
//         title: "Dashboard",
//         path: "/dashboard",
//         icon: <MdDashboard />,
//       },

//       {
//         title: "Patients",
//         path: "/dashboard/patients",
//         icon: <MdPeople />,
//       },
//       {
//         title: "Appointments",
//         path: "/dashboard/appointment",
//         icon: <GrSchedules />,
//       },
//       {
//         title: "Administration",
//         path: "/dashboard/administration",
//         icon: <MdSupervisedUserCircle />,
//       },
//     ],
//   },
//   {
//     title: " IA & Analytics",
//     list: [
//       {
//         title: "Assistant Chatbot",
//         path: "/dashboard/chatbot",
//         icon: <TbMessageChatbot />,
//       },
//     ],
//   },
//   {
//     title: "Doctor Settings",
//     list: [
//       {
//         title: "Profile",
//         path: "/dashboard/profile",
//         icon: <IoPersonCircle />,
//       },
//       {
//         title: "Settings",
//         path: "/dashboard/settings",
//         icon: <MdOutlineSettings />,
//       },
//     ],
//   },
// ];

// const Sidebar = ({ onToggleSidebar }) => {
//   const [expanded, setExpanded] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const handleToggleSidebar = () => {
//     setExpanded((curr) => !curr);
//     onToggleSidebar(!expanded);
//   };
//   const handleLogout = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Logout failed: ", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen dark:bg-[#333] sticky top-0 mb-[20%] ">
//       <div className="flex items-center">
//         <Image
//           className={`object-cover overflow-hidden transition-all ${
//             expanded ? "w-[220px]" : "w-0"
//           }`}
//           src={"/assets/images/kidneysansfond3.png"}
//           alt="Login logo image"
//           width="220"
//           height="10"
//         />
//       </div>
//       {/* <InformationuserClient /> */}
//       <button
//         onClick={handleToggleSidebar}
//         className="absolute p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ml-[100%] mt-[15%]"
//       >
//         {expanded ? (
//           <MdArrowCircleLeft size={20} style={{ color: "#2B3674" }} />
//         ) : (
//           <MdArrowCircleRight size={14} style={{ color: "#2B3674" }} />
//         )}
//       </button>
//       {/* <SidebarContext.Provider value={{ expanded }}>
//                     <ul className="flex-1 px-3">{children}</ul>
//                 </SidebarContext.Provider> */}

//       <ul className="list-none ">
//         {menuItems.map((cat) => (
//           <li key={cat.title} className="mt-10">
//             <span className="text-[#2B3674] font-semibold dark:text-[#FFFFFF]">
//               {cat.title}
//             </span>
//             {cat.list.map((item) => (
//               <MenuLink item={{ ...item, expanded }} key={item.title} />
//             ))}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleLogout}>
//         <button className="logout mt-[15%] ">
//           <MdLogout size={15} className="dark:text-white" />
//           <div className={`${expanded ? "visible" : "hidden"}`}>Logout</div>
//         </button>
//         {isLoading && <Spinner />}
//       </form>
//     </div>
//   );
// };

// export default Sidebar;

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
import { User2 } from "lucide-react";
import { useUser } from "@/lib/AuthContext";
// import InformationuserClient from "./informationuserclient";
import { GrSchedules } from "react-icons/gr";
import { TbMessageChatbot } from "react-icons/tb";
import { logout } from "@/lib/actions";
import Spinner from "@/components/Spinner";
import Image from "next/image";
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

const Sidebar = () => {
  const user = useUser();

  const [expanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const handleToggleSidebar = () => {
  //   setExpanded((curr) => !curr);
  //   onToggleSidebar(!expanded);
  // };
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

  return (
    <div className="h-full bg-background  p-4 border-r border-solid border-r-[#EEEFF2]  font-jakarta">
      <div className="w-full max-h-screens">
        <div className="usercontainer mt-2 mb-2">
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
              <span className="userTitle">User</span>
            )}
          </div>
        </div>
        <ul className="list-none mt-6">
          {menuItems.map((cat) => (
            <li key={cat.title} className="mt-10">
              <span className="text-textPrimary font-semibold">
                {cat.title}
              </span>
              {cat.list.map((item) => (
                <MenuLink item={{ ...item, expanded }} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
        <form onSubmit={handleLogout}>
          <button className=" mt-10 flex items-center">
            <MdLogout size={15} className="text-textPrimary" />
            <div className={`${expanded ? "ml-2" : "hidden"}`}>Logout</div>
          </button>
          {isLoading && <Spinner />}
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
