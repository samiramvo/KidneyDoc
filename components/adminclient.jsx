"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiAddLine } from "react-icons/ri";
import ClientModal from "./modal";
import Pagination from "./pagination";
import { deleteUser } from "@/lib/actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Search from "./search";
const AdminClient = ({ users, count }) => {
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
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [nameuser, setNameUser] = useState("");

  const openModal = (id, username) => {
    setUserIdToDelete(id);
    setNameUser(username);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
    setNameUser("");
  };

  const handleDelete = async () => {
    if (!userIdToDelete) return;

    try {
      await deleteUser(userIdToDelete);
    } catch (error) {
      console.error("Une erreur est survenue :", error);
    }

    closeModal();
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-[#2B3674] text-[26px] mb-8 dark:text-white">
          Administration
        </h1>
      </div>
      <div className="containeradmin shadow-lg dark:bg-[#333]">
        <div className="topadmin">
          {/* <input type="text" placeholder="Search for a user..." /> */}

          <Search placeholder="Search for a user..." />

          <Link href="/dashboard/administration/add">
            <button className="addButtonuser text-[13px] flex hover:shadow-xl transition duration-300">
              <RiAddLine className="mr-[14px] mt-[2px]" size={20} />
              Add New
            </button>
          </Link>
        </div>
        <table className="tableUser">
          <thead>
            <tr className="text-[#605BFF] dark:text-[#A3AED0]">
              <td>Name</td>
              <td>Email</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {count > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id} // Utilisation de _id au lieu de id
                  className="font-medium text-[#1B2559] text-[15px]"
                >
                  <td>
                    <div className="flex items-center gap-[10px] dark:text-white">
                      <Image
                        src={user.img || "/assets/images/Elipse 5.png"}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      {user.username}
                    </div>
                  </td>
                  <td className="dark:text-white">{user.emailuser}</td>
                  <td className="dark:text-white">
                    {/* {user.createdAt?.toString().slice(4, 24)} */}

                    {formatDate(user.createdAt)}
                  </td>
                  <td className="dark:text-white">
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className="dark:text-white">
                    {user.isActive ? "active" : "passive"}
                  </td>
                  <td>
                    <div className="buttonsuser">
                      <Link href={`/dashboard/administration/${user._id}`}>
                        <button className="buttonuser buttonview text-[13px]">
                          View
                        </button>
                      </Link>

                      <button
                        onClick={() => openModal(user._id, user.username)}
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
        <Pagination count={count} ITEM_PER_PAGE={4} />
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        name={nameuser}
      />
    </div>
  );
};

export default AdminClient;
