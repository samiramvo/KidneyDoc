// import { jsPDF } from "jspdf";
// import { useEffect, useState } from "react";

// const ConsultationPDF = ({ params }) => {
//   const { id: patientId, consultationId } = params;
//   const [consultation, setConsultation] = useState(null);

//   useEffect(() => {
//     if (consultationId) {
//       fetch(`/api/consultations/${consultationId}`)
//         .then((res) => res.json())
//         .then((data) => setConsultation(data));
//     }
//   }, [consultationId]);

//   const generatePDF = () => {
//     const doc = new jsPDF();

//     if (consultation) {
//       // Ajoutez le contenu de la consultation au PDF
//       doc.text(
//         `Consultation du: ${new Date(consultation.createdAt).toLocaleDateString(
//           "fr-FR"
//         )}`,
//         10,
//         10
//       );
//       doc.text(
//         `Motif d'hospitalisation: ${consultation.reasonForHospitalization}`,
//         10,
//         20
//       );
//       doc.text(
//         `Antécédents personnels: ${consultation.medicalHistory.personal.join(
//           ", "
//         )}`,
//         10,
//         30
//       );
//       doc.text(
//         `Antécédents chirurgicaux: ${consultation.medicalHistory.surgical.join(
//           ", "
//         )}`,
//         10,
//         40
//       );
//       doc.text(
//         `Antécédents familiaux: Père - ${consultation.medicalHistory.family.father}, Mère - ${consultation.medicalHistory.family.mother}`,
//         10,
//         50
//       );
//       doc.text(
//         `Habitudes sociales: Alcool - ${consultation.socialSurvey.alcohol}, Tabac - ${consultation.socialSurvey.tobacco}`,
//         10,
//         60
//       );
//       doc.text(
//         `Examen clinique: Température - ${consultation.clinicalExamination.temperature}, Tension artérielle - ${consultation.clinicalExamination.bloodPressure}`,
//         10,
//         70
//       );
//       doc.text(`Traitement: ${consultation.treatment}`, 10, 80);
//       doc.text(`Évolution: ${consultation.evolution}`, 10, 90);
//       doc.text(`Conclusion: ${consultation.conclusion}`, 10, 100);

//       // Téléchargement du PDF
//       doc.save(`consultation_${consultationId}.pdf`);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Consultation PDF</h1>
//       {consultation ? (
//         <div>
//           <h2>
//             Consultation du{" "}
//             {new Date(consultation.createdAt).toLocaleDateString("fr-FR")}
//           </h2>
//           <button
//             className="mt-4 bg-blue-500 text-white p-2 rounded"
//             onClick={generatePDF}
//           >
//             Télécharger PDF
//           </button>
//         </div>
//       ) : (
//         <p>Chargement des détails de la consultation...</p>
//       )}
//     </div>
//   );
// };

// export default ConsultationPDF;
