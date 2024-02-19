"use client"

import { HashLoader } from "react-spinners"

import "@/styles/globals.css";

const Spinner = () => {
    return (
        <div className="spinner" >
            <HashLoader
                color="#593DFF"
                speedMultiplier={1}
            />

        </ div>
    );
}

export default Spinner;