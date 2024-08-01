"use client";

import React from "react";

const ClientModal = ({ isOpen, onClose, onConfirm, name }) => {
  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-2">Confirmation</h2>
        <p className="mb-4">Are you sure you want to delete {name} ?</p>
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
