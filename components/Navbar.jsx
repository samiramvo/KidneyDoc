// "use client";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import "@/styles/globals.css";
// import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";
// import ThemeSwitcher from "@/app/ThemeSwitcher";

// const Navbar = () => {
//   const pathname = usePathname();

//   return (
//     <div className="m-0">
//       <div className="containernav ">
//         <div className="titlenav ">{"Pages" + pathname}</div>
//         <div className="menunav ">
//           <div className="searchcont dark:bg-[#333]">
//             <ThemeSwitcher />

//             <div className="iconsnav">
//               <MdOutlineChat size={15} className="dark:text-white" />
//               <MdNotifications size={15} className="dark:text-white" />
//               <MdPublic size={15} className="dark:text-white" />
//             </div>
//             <div>
//               <Image
//                 className="rounded-full"
//                 src={"/assets/images/Elipse 5.png"}
//                 alt="Login logo image"
//                 width="30"
//                 height="30"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// "use client";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";
// import ThemeSwitcher from "@/app/ThemeSwitcher";

// const Navbar = () => {
//   const pathname = usePathname();

//   return (
//     <div className=" p-3 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#EEEFF2]">
//       <div className="flex items-center gap-4">
//         <Image
//           className="object-cover overflow-hidden"
//           src={"/assets/images/kidneysansfond3.png"}
//           alt="Login logo image"
//           width="200"
//           height="10"
//         />
//         <div className="titlenav ">{"Pages" + pathname}</div>
//       </div>

//       <div classname="flex items-center gap-4">
//         <div>
//           <ThemeSwitcher />
//         </div>

//         <div className="iconsnav">
//           <MdOutlineChat size={15} className="dark:text-white" />
//           <MdNotifications size={15} className="dark:text-white" />
//           <MdPublic size={15} className="dark:text-white" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdNotifications, MdOutlineChat, MdPublic } from "react-icons/md";

import ThemeSwitcher from "@/app/ThemeSwitcher";
import { useSidebar } from "@/app/SidebarContext";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const { toggleSidebar, expanded } = useSidebar();
  return (
    <div className="p-3 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#EEEFF2]">
      <div className="flex items-center gap-4">
        <Image
          className="object-cover overflow-hidden"
          src={"/assets/images/kidneysansfond3.png"}
          alt="Login logo image"
          width="200"
          height="10"
        />
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
              />
            </svg>
          )}
        </button>
        {/* <div className="titlenav flex gap-2">{"Pages" + pathname}</div> */}
        {/* <Link href={pathname} className="titlenav flex gap-2">
          {"Pages" + pathname}
        </Link> */}
        <div className="titlenav flex gap-1">
          {"Pages"}
          {pathSegments.map((segment, index) => {
            // Construire le lien pour chaque segment
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            return (
              <React.Fragment key={index}>
                <Link href={href} className="text-violettitle hover:underline">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
                {index < pathSegments.length - 1 && <span>/</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <div className="iconsnav">
          <MdOutlineChat size={15} className="dark:text-white" />
          <MdNotifications size={15} className="dark:text-white" />
          <MdPublic size={15} className="dark:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
