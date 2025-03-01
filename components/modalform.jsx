"use client";

import React, { useEffect } from "react";
import { CloseCircle } from "iconsax-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container dark:bg-darkbackground">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button
            onClick={onClose}
            className="close-button circle-icon-wrapper"
          >
            <CloseCircle size={24} color="#333" />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
