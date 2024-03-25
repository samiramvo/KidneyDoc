"use client"
import "@/styles/globals.css";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    const handleToggleSidebar = (expanded) => {
        setSidebarExpanded(expanded);
    };

    return (
        <div className="bg-[#F4F7FE] flex font-dm_sans dark:bg-[#121212] ">
            <div className={`bg-white dark:bg-[#121212] menudash ${sidebarExpanded ? "expanded" : "collapsed"}`}>
                <Sidebar onToggleSidebar={handleToggleSidebar} />
            </div>
            <div className={`contentdash dark:bg-[#121212] ${sidebarExpanded ? "expanded" : "collapsed"}`}>

                <Navbar />
                {children}
            </div>
        </div>
    );
};


export default DashboardLayout