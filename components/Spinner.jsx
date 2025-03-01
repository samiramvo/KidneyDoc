"use client";

import { HashLoader } from "react-spinners";

import "@/styles/globals.css";

const Spinner = () => {
  return (
    <div className="spinner">
      {/* <HashLoader color="#1B2559" speedMultiplier={1} /> */}
      <HashLoader  color="currentColor" className="dark:text-white"speedMultiplier={1} />
    </div>
  );
};

export default Spinner;
