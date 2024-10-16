"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiAddLine } from "react-icons/ri";
import ClientModal from "./modal";
import Pagination from "./pagination";
import { deleteUser } from "@/lib/actions";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Eye, Trash, Edit2 } from "iconsax-react";
import AddUserPage from "@/app/dashboard/administration/AjoutUser";
import UpdateUserPage from "@/app/dashboard/administration/ModifierUser";
import Search from "./search";
import { User2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const AdminClient = ({ users, count, user }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modalType = searchParams.get("modal");
  const userId = searchParams.get("user");
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
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    router.push("/dashboard/administration");
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
    router.push("/dashboard/administration");
  };

  useEffect(() => {
    if (modalType === "add") {
      setIsAddModalOpen(true);
    } else {
      setIsAddModalOpen(false);
    }

    if (modalType === "update" && userId) {
      const userToUpdate = users.find((user) => user._id === userId);
      if (userToUpdate) {
        setSelectedUser(userToUpdate);
        setIsUpdateModalOpen(true);
      }
    } else {
      setIsUpdateModalOpen(false);
      setSelectedUser(null);
    }
  }, [modalType, userId, users]);

  const openAddModal = () => {
    router.push("/dashboard/administration?modal=add");
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    router.push(`/dashboard/administration?modal=update&user=${user._id}`);
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
        <h1 className="font-bold text-textSecondary text-[26px] mb-8 dark:text-white">
          Administration
        </h1>
      </div>
      <div className="containeradmin border-t border-solid border-b-[#EEEFF2] shadow-lg dark:bg-[#333]">
        <div className="topadmin">
          <Search placeholder="Search ..." />

          <button
            onClick={openAddModal}
            className="bg-violettitle text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <RiAddLine size={22} />
          </button>
        </div>
        <table className="tableUser">
          <thead>
            <tr className="text-violetdesc dark:text-[#A3AED0]">
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Created At</td>
              <td>Role</td>
              <td>Created By</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className=" font-medium text-violettitle   text-[15px]">
            {count > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id} // Utilisation de _id au lieu de id
                  className="group hover:bg-[#f8f8fa] dark:hover:bg-gray-700 border-b border-solid border-b-[#EEEFF2] "
                >
                  {/* <td>
                    <div className="flex items-center gap-[10px] dark:text-white">
                      <Image
                        src={user.img || Users2}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      {user.username}
                    </div>
                  </td> */}
                  <td>
                    <div className="flex items-center gap-[10px] dark:text-white">
                      {user?.img ? (
                        <>
                          <Image
                            src={user?.img}
                            alt={user?.username || "default user"}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          {user.username}
                        </>
                      ) : (
                        <>
                          <User2
                            width={22}
                            height={22}
                            className="bg-background text-violettitle rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                          />
                          {user.username}
                        </>
                      )}
                    </div>
                  </td>

                  <td className="dark:text-white">{user.emailuser}</td>
                  <td className="dark:text-white">{user.phoneuser}</td>
                  <td className="dark:text-white">
                    {/* {user.createdAt?.toString().slice(4, 24)} */}

                    {formatDate(user.createdAt)}
                  </td>
                  <td className="dark:text-white">
                    {user.isAdmin ? "Admin" : "Doctor"}
                  </td>
                  <td className="dark:text-white">{user.createdby}</td>
                  <td>
                    <div className="buttonsuser">
                      <Link href={`/dashboard/administration/${user._id}`}>
                        <Eye size="24" color="#3C3F4A" />
                      </Link>
                      <Edit2
                        size="24"
                        color="#3C3F4A"
                        className="cursor-pointer"
                        onClick={() => openUpdateModal(user)}
                      />

                      <button
                        onClick={() => openModal(user._id, user.username)}
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
        <Pagination count={count} ITEM_PER_PAGE={4} />
      </div>

      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        name={nameuser}
      />
      {isAddModalOpen && (
        <AddUserPage
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          user={user}
        />
      )}

      {isUpdateModalOpen && selectedUser && (
        <UpdateUserPage
          user={selectedUser}
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
        />
      )}
    </div>
  );
};

export default AdminClient;
