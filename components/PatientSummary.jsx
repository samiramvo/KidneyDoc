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

// import React, { useEffect, useState } from "react";

// const PatientSummary = ({ patientId }) => {
//   const [patientInfo, setPatientInfo] = useState(null);

//   useEffect(() => {
//     if (patientId) {
//       console.log("Fetching patient info for ID:", patientId); // Log pour vérifier l'ID
//       fetch(`/api/patients/${patientId}`)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error(
//               "Erreur réseau lors de la récupération des données"
//             );
//           }
//           return res.json();
//         })
//         .then((data) => {
//           console.log("Patient data received:", data); // Log pour vérifier les données reçues
//           setPatientInfo(data);
//         })
//         .catch((error) =>
//           console.error(
//             "Erreur lors de la récupération des infos du patient:",
//             error
//           )
//         );
//     }
//   }, [patientId]);

//   if (!patientInfo) {
//     return <p>Chargement des informations du patient...</p>;
//   }

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Patient Summary</h2>
//       <div className="flex items-center mb-4">
//         <div>
//           <p className="text-lg font-semibold">Patient ID: {patientId}</p>
//           <p className="text-sm">Name: {patientInfo.name_patient}</p>
//           <p className="text-sm">Firstname: {patientInfo.prenom_patient}</p>
//           <p className="text-sm">Age: {patientInfo.agepatient}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientSummary;
