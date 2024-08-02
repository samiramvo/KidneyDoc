"use client";
import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ClientModal from "./modal";
import { deletePatient } from "@/lib/actions";

const Tablepatient = async ({ patients }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "EEEE d MMMM yyyy 'à' HH:mm", {
      locale: fr,
    });
    return capitalizeFirstLetter(formattedDate);
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);

  const [namepatient, setNamepatient] = useState("");
  const [prenompatient, setPrenompatient] = useState("");
  const openModal = (id, name_patient, prenom_patient) => {
    setPatientIdToDelete(id);
    setNamepatient(name_patient);
    setPrenompatient(prenom_patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPatientIdToDelete(null);
    setNamepatient("");
    setPrenompatient("");
  };

  const handleDelete = async () => {
    if (!patientIdToDelete) return;

    try {
      await deletePatient(patientIdToDelete);
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    }

    closeModal();
  };
  return (
    <div>
      <div className="containerpatient shadow-lg dark:bg-[#333] dark:shadow-lg">
        <div className="flex ">
          <h2 className="titlepatient ml-[10px] dark:text-[#605BFF]">
            Patient Data
          </h2>
          <Link href={"/dashboard/patients"} className="ml-auto">
            <h2 className="titlepatient dark:text-[#605BFF]"> View All</h2>
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr className="text-[#605BFF] dark:text-[#A3AED0]">
              {/* <td>ID</td> */}
              <td>Name</td>
              <td>Assigned Doctor</td>
              <td>Gender</td>
              <td>Age</td>
              <td>Phone Number</td>
              <td>Created At</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody className=" font-medium text-[#1B2559]  text-[15px]">
            {patients.map((patient) => (
              <tr
                key={patient._id}
                className="group hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                {/* <td>
                  <div className="bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center">
                    {patient.tempId}
                  </div>
                </td> */}
                <td>
                  <div className="namepatient flex dark:text-white">
                    <div className="mr-2">
                      <span>{patient.name_patient}</span>
                    </div>
                    <div>
                      <span>{patient.prenom_patient}</span>
                    </div>
                  </div>
                </td>
                <td className="dark:text-white">{patient.doctor}</td>
                <td className="dark:text-white">{patient.gender}</td>
                <td className="dark:text-white">{patient.agepatient}</td>
                <td className="dark:text-white">{patient.phone_patient}</td>
                <td className="dark:text-white">
                  {formatDate(patient.createdAt)}
                </td>
                <td>
                  <div className="buttonsuser">
                    <Link href={`/dashboard/patients/${patient._id}`}>
                      {/* <div className="relative bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[42px] h-[32px]  flex items-center justify-center">
                        <Image
                          src={"/assets/icons/more_horiz.png"}
                          alt="Icon"
                          width="20"
                          height="20"
                        />
                      </div> */}
                      <button className="buttonuser buttonview text-[13px]">
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        openModal(
                          patient._id,
                          patient.name_patient,
                          patient.prenom_patient
                        )
                      }
                      className="buttonuser buttondelete text-[13px]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        name={`${namepatient} ${prenompatient}`}
      />
    </div>
  );
};

export default Tablepatient;
