// components/PatientSummary.js
import React from "react";

const PatientSummary = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Patient Summary</h2>
      <div className="flex items-center mb-4">
        <div>
          <p className="text-lg font-semibold">Patient ID: 21640002146</p>
          <p className="text-sm">Name: Mr. Shekhar Vasant Dhore</p>
          <p className="text-sm">Enquiry ID: 189484315484</p>
          <p className="text-sm">Registered For: Homeopathy Gold Plan</p>
        </div>
      </div>
      {/* <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Patient Details
        </button>
        <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md">
          Patient Summary
        </button>
      </div> */}
    </div>
  );
};

export default PatientSummary;
