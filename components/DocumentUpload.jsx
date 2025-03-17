// "use client";

// import React, { useState } from "react";
// import { DocumentDownload } from "iconsax-react";

// const DocumentUploadComponent = () => {
//   const [fileInput, setFileInput] = useState(null);
//   const [documents, setDocuments] = useState([]);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setFileInput(files);
//   };

//   const handleUpload = () => {
//     if (fileInput) {
//       const newDocuments = fileInput.map((file) => ({
//         id: file.name,
//         name: file.name,
//         url: URL.createObjectURL(file),
//       }));

//       setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
//       setFileInput(null);
//     }
//   };

//   return (
//     <div className=" p-4 ">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Documents</h3>
//         <div className="flex gap-2 ">
//           <DocumentDownload size={24} className="text-violettitle" />
//           <p className="text-violettitle text-md">Add files</p>
//         </div>
//       </div>

//       <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 mb-4">
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={handleFileChange}
//           className="hidden"
//           id="file-upload"
//           multiple
//         />
//         <label
//           htmlFor="file-upload"
//           className="flex flex-col items-center justify-center cursor-pointer h-full"
//         >
//           <span className="text-gray-500 mb-4">
//             Drag and drop your files here or
//           </span>
//           <button
//             onClick={handleUpload}
//             className="bg-violettitle text-white w-[20%] rounded-[20px] px-2 py-2 text-[15px] mb-4 "
//           >
//             Upload
//           </button>

//           <span className="text-sm text-gray-500">
//             Supports JPG and PNG, PDF up to 5MB
//           </span>
//         </label>
//       </div>

//       <ul className="mt-4">
//         {documents.map((doc) => (
//           <li key={doc.id} className="mb-2">
//             <a href={doc.url} className="text-blue-500 hover:underline">
//               {doc.name}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocumentUploadComponent;

import React, { useState, useEffect } from "react";
import { DocumentDownload } from "iconsax-react";
import Modal from "./modalform"; 
import { addDocument, fetchDocumentsByPatientId } from "@/lib/actions"; 
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from '@mui/icons-material/Visibility';

const DocumentUploadComponent = ({ patientId, currentUser   }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFolders, setOpenFolders] = useState({});

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fetchedDocuments = await fetchDocumentsByPatientId(patientId);
        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to fetch documents.");
      }
    };

    fetchDocuments();
  }, [patientId]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileInput(files);
  };

  const handleUpload = async () => {
    if (fileInput) {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        fileInput.forEach((file) => formData.append("files", file));
        formData.append("patientId", patientId);
  
        const newDocuments = await addDocument(formData, currentUser?.username);
        setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
        toast.success("Files uploaded successfully!");
        setFileInput(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading files:", error);
        toast.error("Failed to upload files.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const groupDocumentsByDate = (documents) => {
    return documents.reduce((acc, doc) => {
      const date = new Date(doc.uploadDate);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(doc);

      return acc;
    }, {});
  };

  const documentsByDate = groupDocumentsByDate(documents);

  const toggleFolder = (folderKey) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-violettitle text-white p-2 rounded"
        >
          <DocumentDownload size={24} />
          <span className="text-sm">Add files</span>
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Uploaded By</strong></TableCell>
              <TableCell><strong>Upload Date</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(documentsByDate).map(([year, months]) => (
              <>
                <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
                  <TableCell colSpan={4}>
                    <FolderIcon style={{ marginRight: "8px" }} />
                    {year}
                  </TableCell>
                </TableRow>

                {openFolders[year] &&
                  Object.entries(months).map(([month, docs]) => (
                    <>
                      <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
                        <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
                          <FolderIcon style={{ marginRight: "8px" }} />
                          {month}
                        </TableCell>
                      </TableRow>

                      {openFolders[`${year}-${month}`] &&
                        docs.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell style={{ paddingLeft: "64px" }}>
                              <DescriptionIcon style={{ marginRight: "8px" }} />
                              {doc.name}
                            </TableCell>
                            <TableCell>{`Dr ${doc.uploadedBy || "Unknown"}`}</TableCell>
                            <TableCell>{new Date(doc.uploadDate).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell align="right">
                              <IconButton aria-label="view document" href={doc.url} target="_blank" rel="noopener noreferrer" >
                                <VisibilityIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-form-container max-h-screen font-jakarta dark:bg-darkbackground">
          <div className="modal-form-header flex gap-2 ">
            <div className="modal-form-logo">
              <span className="mr-4">
                <DocumentDownload size={28} className="text-violettitle dark:text-white" />
              </span>
            </div>
            <div className="modal-form-role flex flex-align-item-center pb-4">
              <p className="text-lg text-violettitle font-bold dark:text-white">
                Upload Documents
              </p>
            </div>
          </div>
          <div className="modal-form-body">
            <input
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              onChange={handleFileChange}
              multiple
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleUpload}
              className={`w-[20%]  rounded-[20px] px-2 py-2 text-[15px] bg-violettitle text-white ${
                isSubmitting ? "opacity-85 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentUploadComponent;