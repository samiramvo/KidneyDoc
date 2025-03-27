// "use client"
// import { useState, useRef} from "react";
// import DocumentUploadComponent from "@/components/DocumentUpload";
// import NotePatientComponent from "@/components/NotePatient";
// import ConsultationsPage from "@/app/dashboard/patients/[id]/consultations/page";
// import ObservationPage from "@/app/dashboard/patients/[id]/observation/page";

// const PatientTabs = ({ patientId, user }) => {
//   const [activeTab, setActiveTab] = useState("consultations");
//   const tabsRef = useRef([]);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "consultations":
//         return <ConsultationsPage params={{ id: patientId }} />;
//       case "observations":
//         return <ObservationPage params={{ id: patientId }} />;
//       case "notes":
//         return <NotePatientComponent patientId={patientId} currentUser={user} />;
//       case "documents":
//         return <DocumentUploadComponent patientId={patientId} currentUser={user} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-5">
//       <div className="relative flex  mb-5 border-b-2 border-gray-300">
//         {["consultations", "observations", "notes", "documents"].map((tab, index) => (
//           <button
//             key={tab}
//             ref={(el) => (tabsRef.current[index] = el)} // Référence de chaque bouton
//             className={`px-4 py-2 ${activeTab === tab ? "text-black" : "text-gray-500 hover:bg-[#EEEFF2] hover:text-black"}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//         <div
//           className="absolute bottom-[-0.1rem] h-0.5 bg-black transition-all duration-300 ease-in-out"
//           style={{
//             width: `${tabsRef.current.length ? tabsRef.current[0]?.offsetWidth : 0}px`, // Ajuste la largeur en fonction de l'élément
//             transform: `translateX(${tabsRef.current
//               .slice(0, ["consultations", "observations", "notes", "documents"].indexOf(activeTab))
//               .reduce((acc, el) => acc + el.offsetWidth, 0)}px)`, // Calcule la position de l'élément actif
//           }}
//         />
//       </div>
//       <div className="p-3 border border-gray-300 bg-background shadow-md rounded-lg ">
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// export default PatientTabs;
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DocumentUploadComponent from "@/components/DocumentUpload";
import NotePatientComponent from "@/components/NotePatient";
import ConsultationsPage from "@/app/dashboard/patients/[id]/consultations/page";
import ObservationPage from "@/app/dashboard/patients/[id]/observation/page";

const PatientTabs = ({ patientId, user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const tabsRef = useRef([]);
  const tabs = ["consultations", "observations", "notes", "documents"];

  // Détecter l'onglet actif depuis l'URL
  const getActiveTabFromPath = () => {
    const foundTab = tabs.find((tab) => pathname.includes(tab));
    return foundTab || "consultations";
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromPath);
  const [forceReload, setForceReload] = useState(false); // État pour forcer un rechargement

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.replace(`/dashboard/patients/${patientId}?tab=${tab}`, { scroll: false });

    // Forcer un re-render local sans changer de page
    setForceReload((prev) => !prev);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "consultations":
        return <ConsultationsPage key={forceReload} params={{ id: patientId }} />;
      case "observations":
        return <ObservationPage key={forceReload} params={{ id: patientId }} />;
      case "notes":
        return <NotePatientComponent key={forceReload} patientId={patientId} currentUser={user} />;
      case "documents":
        return <DocumentUploadComponent key={forceReload} patientId={patientId} currentUser={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-5">
      <div className="relative flex mb-5 border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`px-4 py-2 ${
              activeTab === tab ? "text-black" : "text-gray-500 hover:bg-[#EEEFF2] hover:text-black"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
        <div
          className="absolute bottom-[-0.1rem] h-0.5 bg-black transition-all duration-300 ease-in-out"
          style={{
            width: `${tabsRef.current.length ? tabsRef.current[0]?.offsetWidth : 0}px`,
            transform: `translateX(${tabsRef.current
              .slice(0, tabs.indexOf(activeTab))
              .reduce((acc, el) => acc + el.offsetWidth, 0)}px)`,
          }}
        />
      </div>
      <div className="p-3 border border-gray-300 bg-background shadow-md rounded-lg ">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PatientTabs;
