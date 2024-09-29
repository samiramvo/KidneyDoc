// context/UserContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/app/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const { user } = await auth();
  //     setUser(user);
  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
