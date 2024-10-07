"use client";

import React, { useState } from "react";
import { DocumentDownload } from "iconsax-react";

const DocumentUploadComponent = () => {
  const [fileInput, setFileInput] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileInput(files);
  };

  const handleUpload = () => {
    if (fileInput) {
      const newDocuments = fileInput.map((file) => ({
        id: file.name,
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
      setFileInput(null);
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-6 mb-4 h-[300px]">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="flex gap-2 ">
          <DocumentDownload size={24} className="text-violettitle" />
          <p className="text-violettitle text-md">Add files</p>
        </div>
      </div>

      <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          multiple
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer h-full"
        >
          <span className="text-gray-500 mb-4">
            Drag and drop your files here or
          </span>
          <button
            onClick={handleUpload}
            className="bg-violettitle text-white w-[20%] rounded-[20px] px-2 py-2 text-[15px] mb-4 "
          >
            Upload
          </button>

          <span className="text-sm text-gray-500">
            Supports JPG and PNG, PDF up to 5MB
          </span>
        </label>
      </div>

      <ul className="mt-4">
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2">
            <a href={doc.url} className="text-blue-500 hover:underline">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentUploadComponent;
