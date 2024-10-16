// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// const ConsultationsPage = ({ params }) => {
//   const { id: patientId } = params;

//   const [consultations, setConsultations] = useState([]);
//   useEffect(() => {
//     if (patientId) {
//       console.log("Patient ID:", patientId); // Ajoutez ceci pour déboguer
//       fetch(`/api/patients/${patientId}/consultations`)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error(`Erreur: ${res.status}`);
//           }
//           return res.json();
//         })
//         .then((data) => {
//           if (data) {
//             setConsultations(data);
//           } else {
//             console.error("Données vides reçues");
//           }
//         })
//         .catch((error) => {
//           console.error(
//             "Erreur lors de la récupération des consultations:",
//             error
//           );
//         });
//     }
//   }, [patientId]);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Consultations</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {consultations.map((consultation) => (
//           <div
//             key={consultation.id}
//             className="p-4 bg-white shadow-md rounded-lg"
//           >
//             <h2 className="text-lg font-semibold">
//               Consultation du{" "}
//               {new Date(consultation.date).toLocaleDateString("fr-FR")}
//             </h2>
//             <p>{consultation.summary}</p>

//             {/* Lien pour télécharger le PDF */}
//             <a
//               href={`/api/patients/${patientId}/consultations/${consultation.id}/pdf`}
//               className="text-blue-500 hover:underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Télécharger le PDF
//             </a>
//           </div>
//         ))}
//       </div>
//       <Link href={`/dashboard/patients/${patientId}/consultations/new`}>
//         <button className="mt-4 bg-violettitle text-white p-2 rounded">
//           Ajouter une nouvelle consultation
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default ConsultationsPage;

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsultationsByPatientId } from "@/lib/actions";
const ConsultationsPage = ({ params }) => {
  const { id: patientId } = params;

  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      if (patientId) {
        try {
          const data = await getConsultationsByPatientId(patientId);
          setConsultations(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des consultations:",
            error
          );
        }
      }
    };

    fetchConsultations();
  }, [patientId]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">Consultations</h1>
        <Link href={`/dashboard/patients/${patientId}/consultations/new`}>
          <button className=" bg-violettitle text-white p-2 rounded">
            New consultation
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {consultations.map((consultation) => (
          <div
            key={consultation._id}
            className="p-4 bg-white shadow-md rounded-lg"
          >
            <h2 className="text-lg font-semibold">
              Consultation du{" "}
              {new Date(consultation.createdAt).toLocaleDateString("fr-FR")}
            </h2>
            {/* <p>{consultation.summary}</p> */}

            {/* Lien pour télécharger le PDF */}
            <a
              href={`/api/patients/${patientId}/consultations/${consultation._id}`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir le PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationsPage;
