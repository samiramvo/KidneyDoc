// "use client";
// import "@/styles/globals.css";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";

// const DashboardLayout = ({ children }) => {
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);

//   const handleToggleSidebar = (expanded) => {
//     setSidebarExpanded(expanded);
//   };

//   return (
//     <div className="bg-[#F4F7FE]  flex font-dm_sans dark:bg-[#121212] ">
//       <div
//         className={`bg-white dark:bg-[#333] menudash ${
//           sidebarExpanded ? "expanded" : "collapsed"
//         } `}
//       >
//         <Sidebar onToggleSidebar={handleToggleSidebar} />
//       </div>
//       <div
//         className={`contentdash dark:bg-[#121212] ${
//           sidebarExpanded ? "expanded" : "collapsed"
//         }`}
//       >
//         <Navbar />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

"use client";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/footer";

const DashboardLayout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarExpanded((curr) => !curr);
  };

  return (
    <div className="flex flex-col bg-background w-full min-h-screen font-jakarta">
      <div className="flex-row">
        <Navbar
          onToggleSidebar={handleToggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
      </div>

      <div className="flex flex-row flex-1">
        <div
          className={`flex flex-col shadow-sm transition-width menudash ${
            sidebarExpanded ? "expanded" : "collapsed"
          }`}
        >
          <Sidebar onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="flex flex-col flex-1 p-4 w-full max-h-screens">
          {children}
        </div>
      </div>
      <div className="flex justify-center items-center border-t">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
