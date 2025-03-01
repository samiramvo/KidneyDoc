"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export default function SidebarProvider({ children }) {
  const [expanded, setexpanded] = useState(true);

  const toggleSidebar = () => {
    setexpanded((curr) => !curr);
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
