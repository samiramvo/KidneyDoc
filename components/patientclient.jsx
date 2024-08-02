"use client";
import Image from "next/image";
import { useMemo } from "react";
import React, { useState } from "react";
import Pagination from "@/components/pagination";
import Link from "next/link";
import Search from "./search";
import FilterForm from "@/components/filterform";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ClientModal from "./modal";
import { deletePatient } from "@/lib/actions";
const PatientClient = async ({ patients, count }) => {
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

  // const idMap = useMemo(() => {
  //   // Trier les patients par date de création (plus ancien en premier)
  //   const sortedByDate = [...patients].sort(
  //     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  //   );
  //   // Créer un mapping des _id aux numéros d'ordre basé sur createdAt
  //   const map = new Map();
  //   sortedByDate.forEach((patient, index) => {
  //     map.set(patient._id, index + 1);
  //   });
  //   return map;
  // }, [patients]);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-[#2B3674] text-[26px] mb-8 dark:text-white">
            Patient Data
          </h1>
        </div>
        <div className="mt-[50px] ">
          <Link href="/dashboard/patients/add">
            <button className="bg-[#2a79d7] w-[150px] p-[8px] text-[15px] text-white border-none cursor-pointer rounded-[5px] flex hover:shadow-xl transition duration-300">
              <RiAddLine className="mr-[14px] mt-[2px]" size={20} />
              New patient
            </button>
          </Link>
        </div>
      </div>
      <FilterForm />
      <div className="containerpatient rounded-lg shadow-lg dark:bg-[#333] dark:shadow-lg">
        <div className="mb-6">
          <Search placeholder="Search for a patient..." />
        </div>

        <table className="table">
          <thead>
            <tr className="text-[#605BFF] dark:text-[#A3AED0]">
              <td>ID</td>
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
            {count > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="group hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <td>
                    <div className="bg-[#eeefff] rounded-[8px] text-[#4318FF] w-[32px] h-[32px]  flex items-center justify-center">
                      {/* {idMap.get(patient._id)} */}
                      {patient.tempId}
                    </div>
                  </td>
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
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 dark:text-white">
                  Recherche non trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination count={count} ITEM_PER_PAGE={6} />
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

export default PatientClient;
