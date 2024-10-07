"use client";
import { Edit2 } from "iconsax-react";
import { GrAnalytics } from "react-icons/gr";
import Link from "next/link";

const SinglePatientComponent = ({ patient }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className=" rounded-lg bg-background shadow-md p-6 h-[300px]">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold">
            {patient.name_patient} {patient.prenom_patient}
          </h2>
          <p className="text-violettitle">Patient</p>
        </div>

        <div className="flex gap-2 ">
          <Edit2 size={24} className="text-violettitle" />
          <p className="text-violettitle text-md">Edit</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-3 gap-4 w-[70%]">
          <div>
            <p className="text-textSecondary">Date de naissance:</p>
            <p className="text-violettitle">{formatDate(patient.birth)}</p>
          </div>
          <div>
            <p className="text-textSecondary">Âge:</p>
            <p className="text-violettitle">{patient.agepatient || "N/A"}</p>
          </div>
          <div>
            <p className="text-textSecondary">Genre:</p>
            <p className="text-violettitle">{patient.gender || "N/A"}</p>
          </div>
          <div>
            <p className="text-textSecondary">Numéro de téléphone:</p>
            <p className="text-violettitle">{patient.phone_patient || "N/A"}</p>
          </div>
          <div>
            <p className="text-textSecondary">Adresse:</p>
            <p className="text-violettitle">
              {patient.addresspatient || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-textSecondary">Docteur assigné:</p>
            <p className="text-violettitle">{patient.doctor || "N/A"}</p>
          </div>
        </div>
        <div className="w-[25%] flex  justify-end">
          <div>
            <Link href={`/dashboard/patients/${patient._id}/consultation`}>
              <div className="w-auto rounded-[20px] px-8 py-2 text-[15px] mb-4   bg-violettitle text-white  ">
                <div>Consultation</div>
              </div>
            </Link>
            <Link href={`/dashboard/patients/${patient._id}/observation`}>
              <div className="w-auto rounded-[20px] px-8 py-2 text-[15px]  mb-4  bg-violettitle text-white ">
                <div>Observation</div>
              </div>
            </Link>
            <div className="w-auto flex items-center rounded-[20px] px-8 py-2 text-[15px]  mb-4  bg-violettitle text-white ">
              <GrAnalytics size={20} className="text-white mr-4" />
              <div>Analyse</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePatientComponent;
