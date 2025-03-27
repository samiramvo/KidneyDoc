// import React, { useState, useEffect } from "react";
// import { DocumentDownload } from "iconsax-react";
// import Modal from "./modalform"; 
// import { addDocument, fetchDocumentsByPatientId } from "@/lib/actions"; 
// import toast from "react-hot-toast";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import DescriptionIcon from "@mui/icons-material/Description";
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const DocumentUploadComponent = ({ patientId, currentUser   }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [fileInput, setFileInput] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openFolders, setOpenFolders] = useState({});

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const fetchedDocuments = await fetchDocumentsByPatientId(patientId);
//         setDocuments(fetchedDocuments);
//       } catch (error) {
//         console.error("Error fetching documents:", error);
//         toast.error("Failed to fetch documents.");
//       }
//     };

//     fetchDocuments();
//   }, [patientId]);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setFileInput(files);
//   };

//   const handleUpload = async () => {
//     if (fileInput) {
//       try {
//         setIsSubmitting(true);
//         const formData = new FormData();
//         fileInput.forEach((file) => formData.append("files", file));
//         formData.append("patientId", patientId);
  
//         const newDocuments = await addDocument(formData, currentUser?.username);
//         setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
//         toast.success("Files uploaded successfully!");
//         setFileInput(null);
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error("Error uploading files:", error);
//         toast.error("Failed to upload files.");
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   const groupDocumentsByDate = (documents) => {
//     return documents.reduce((acc, doc) => {
//       const date = new Date(doc.uploadDate);
//       const year = date.getFullYear();
//       const month = date.toLocaleString("default", { month: "long" });

//       if (!acc[year]) acc[year] = {};
//       if (!acc[year][month]) acc[year][month] = [];
//       acc[year][month].push(doc);

//       return acc;
//     }, {});
//   };

//   const documentsByDate = groupDocumentsByDate(documents);

//   const toggleFolder = (folderKey) => {
//     setOpenFolders((prev) => ({
//       ...prev,
//       [folderKey]: !prev[folderKey],
//     }));
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Documents</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-violettitle text-white p-2 rounded"
//         >
//           <DocumentDownload size={24} />
//           <span className="text-sm">Add files</span>
//         </button>
//       </div>

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Name</strong></TableCell>
//               <TableCell><strong>Uploaded By</strong></TableCell>
//               <TableCell><strong>Upload Date</strong></TableCell>
//               <TableCell align="right"><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(documentsByDate).map(([year, months]) => (
//               <>
//                 <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
//                   <TableCell colSpan={4}>
//                     <FolderIcon style={{ marginRight: "8px" }} />
//                     {year}
//                   </TableCell>
//                 </TableRow>

//                 {openFolders[year] &&
//                   Object.entries(months).map(([month, docs]) => (
//                     <>
//                       <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
//                         <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
//                           <FolderIcon style={{ marginRight: "8px" }} />
//                           {month}
//                         </TableCell>
//                       </TableRow>

//                       {openFolders[`${year}-${month}`] &&
//                         docs.map((doc) => (
//                           <TableRow key={doc.id}>
//                             <TableCell style={{ paddingLeft: "64px" }}>
//                               <DescriptionIcon style={{ marginRight: "8px" }} />
//                               {doc.name}
//                             </TableCell>
//                             <TableCell>{`Dr ${doc.uploadedBy || "Unknown"}`}</TableCell>
//                             <TableCell>{new Date(doc.uploadDate).toLocaleDateString("fr-FR")}</TableCell>
//                             <TableCell align="right">
//                               <IconButton aria-label="view document" href={doc.url} target="_blank" rel="noopener noreferrer" >
//                                 <VisibilityIcon />
//                               </IconButton>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                     </>
//                   ))}
//               </>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="modal-form-container max-h-screen font-jakarta dark:bg-darkbackground">
//           <div className="modal-form-header flex gap-2 ">
//             <div className="modal-form-logo">
//               <span className="mr-4">
//                 <DocumentDownload size={28} className="text-violettitle dark:text-white" />
//               </span>
//             </div>
//             <div className="modal-form-role flex flex-align-item-center pb-4">
//               <p className="text-lg text-violettitle font-bold dark:text-white">
//                 Upload Documents
//               </p>
//             </div>
//           </div>
//           <div className="modal-form-body">
//             <input
//               type="file"
//               accept="image/png, image/jpeg, application/pdf"
//               onChange={handleFileChange}
//               multiple
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <button
//               onClick={handleUpload}
//               className={`w-[20%]  rounded-[20px] px-2 py-2 text-[15px] bg-violettitle text-white ${
//                 isSubmitting ? "opacity-85 cursor-not-allowed" : ""
//               }`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Uploading..." : "Upload"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default DocumentUploadComponent;

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { fetchDocumentsByPatientId } from "@/lib/actions";

const DocumentComponent = ({ patientId }) => {
  const [documents, setDocuments] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

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

  const handleOpenModal = async (documentId) => {
    try {
      const response = await fetch(`/api/patients/${patientId}/documents/${documentId}`, { method: "GET" });

      if (!response.ok) throw new Error("Error fetching the PDF");

      const blob = await response.blob();
      setPdfUrl(URL.createObjectURL(blob));
      setOpenModal(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to open the document.");
    }
  };

  return (
    <div className="p-4">
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
                          <TableRow key={doc._id}>
                            <TableCell style={{ paddingLeft: "64px" }}>
                               <DescriptionIcon style={{ marginRight: "8px" }} />
                               {doc.name}
                             </TableCell>
                             <TableCell>{`Dr ${doc.uploadedBy || "Unknown"}`}</TableCell>
                             <TableCell>{new Date(doc.uploadDate).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell align="right">
                              <IconButton aria-label="view document" onClick={() => handleOpenModal(doc._id)}>
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

      {/* Modal pour afficher le PDF */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="lg" fullWidth>
        <DialogContent dividers>
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="600px"></iframe>
          ) : (
            <p>Chargement du PDF...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DocumentComponent;
