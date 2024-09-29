// context/UserContext.js
"use client";
import { createContext, useContext, useState } from "react";
// import { auth } from "@/app/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useState(null);
  // const [loading, setLoading] = useState(true);

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
