"use client";

import React from "react";

const ClientModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="modal backdrop-blur-custom fixed inset-0 flex items-center justify-center ">
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirmation</h2>
        <p className="mb-4">Are you sure you want to delete {name} ?</p>
        <p className="text-red-500 my-5 w-[500px]">
          This action is irreversible. Once deleted, this item cannot be
          recovered but will still be present in the database.
        </p>
        <div className="flex justify-end space-x-4 ">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
