"use client";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/pagination";
import Link from "next/link";
import Search from "./search";
import FilterForm from "@/components/filterform";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ClientModal from "./modal";
import { Eye, Trash, Edit2 } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePatient } from "@/lib/actions";
import AddPatientPage from "@/app/dashboard/patients/AjoutPatient";
import UpdatePatientPage from "@/app/dashboard/patients/ModifierPatient";

const PatientClient = ({ patients, count }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal");
  const patientId = searchParams.get("patient");

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
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
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    router.push("/dashboard/patients");
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPatient(null);
    router.push("/dashboard/patients");
  };

  useEffect(() => {
    if (modalType === "add") {
      setIsAddModalOpen(true);
    } else {
      setIsAddModalOpen(false);
    }

    if (modalType === "update" && patientId) {
      const patientToUpdate = patients.find(
        (patient) => patient._id === patientId
      );
      if (patientToUpdate) {
        setSelectedPatient(patientToUpdate);
        setIsUpdateModalOpen(true);
      }
    } else {
      setIsUpdateModalOpen(false);
      setSelectedPatient(null);
    }
  }, [modalType, patientId, patients]);

  const openAddModal = () => {
    router.push("/dashboard/patients?modal=add");
  };

  const openUpdateModal = (patient) => {
    setSelectedPatient(patient);
    router.push(`/dashboard/patients?modal=update&patient=${patient._id}`);
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
          <h1 className="font-bold text-textSecondary text-[26px] mb-8 dark:text-white">
            Patient Data
          </h1>
        </div>
      </div>
      <div className="mb-6">
        <FilterForm />
      </div>

      <div className="containerpatient  border-t border-solid border-b-[#EEEFF2]  shadow-lg dark:bg-[#333] dark:shadow-lg">
        <div className="topadmin">
          <Search placeholder="Search ... " />

          <button
            onClick={openAddModal}
            className="bg-violettitle text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <RiAddLine size={22} />
          </button>
        </div>

        <table className="table">
          <thead>
            <tr className="text-violetdesc dark:text-[#A3AED0]">
              <td>ID</td>
              <td>Name</td>
              <td>Assigned Doctor</td>
              <td>Gender</td>
              <td>Age</td>
              <td>Phone Number</td>
              <td>Created At</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className=" font-medium text-violettitle   text-[15px]">
            {count > 0 ? (
              patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="group hover:bg-[#f8f8fa] dark:hover:bg-gray-700 border-b border-solid border-b-[#EEEFF2] "
                >
                  <td>
                    <div className="bg-[#EEEFF2] rounded-[8px] text-violettitle w-[32px] h-[32px]  flex items-center justify-center">
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
                    <div className="buttonsuser flex space-x-4">
                      <Link href={`/dashboard/patients/${patient._id}`}>
                        <Eye size="24" color="#3C3F4A" />
                      </Link>

                      <Edit2
                        size="24"
                        color="#3C3F4A"
                        className="cursor-pointer"
                        onClick={() => openUpdateModal(patient)}
                      />
                      <button
                        onClick={() =>
                          openModal(
                            patient._id,
                            patient.name_patient,
                            patient.prenom_patient
                          )
                        }
                      >
                        <Trash size="24" color="#3C3F4A" />
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

      {isAddModalOpen && (
        <AddPatientPage isOpen={isAddModalOpen} onClose={closeAddModal} />
      )}

      {isUpdateModalOpen && selectedPatient && (
        <UpdatePatientPage
          patient={selectedPatient}
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
        />
      )}
    </div>
  );
};

export default PatientClient;
