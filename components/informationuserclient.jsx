// app/components/InformationuserClient.js
"use client";

import { useState } from "react";
import Informationuser from "./Informationuser";

const InformationuserClient = () => {
  const [userData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { user } = await auth();
  //     setUserData(user);
  //   };
  //   fetchData();
  // }, []);

  if (!userData) return <div>Loading...</div>;

  return <Informationuser user={userData} />;
};

export default InformationuserClient;
