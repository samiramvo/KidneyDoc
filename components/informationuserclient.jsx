// app/components/InformationuserClient.js
"use client";

import { useEffect, useState } from "react";
import Informationuser from "./Informationuser";

const InformationuserClient = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user } = await auth(); // Assurez-vous que `auth` est accessible ici
      setUserData(user);
    };
    fetchData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return <Informationuser user={userData} />;
};

export default InformationuserClient;
