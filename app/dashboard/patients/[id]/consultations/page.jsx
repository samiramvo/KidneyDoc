
// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { getConsultationsByPatientId } from "@/lib/actions";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import DescriptionIcon from "@mui/icons-material/Description";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { RiAddLine } from "react-icons/ri";

// const ConsultationsPage = ({ params }) => {
//   const { id: patientId } = params;

//   const [consultations, setConsultations] = useState([]);
//   const [openFolders, setOpenFolders] = useState({});

//   useEffect(() => {
//     const fetchConsultations = async () => {
//       if (patientId) {
//         try {
//           const data = await getConsultationsByPatientId(patientId);
//           setConsultations(data);
//         } catch (error) {
//           console.error("Error fetching consultations:", error);
//         }
//       }
//     };

//     fetchConsultations();
//   }, [patientId]);

//   const groupConsultationsByDate = (consultations) => {
//     return consultations.reduce((acc, consultation) => {
//       const date = new Date(consultation.createdAt);
//       const year = date.getFullYear();
//       const month = date.toLocaleString("default", { month: "long" });

//       if (!acc[year]) acc[year] = {};
//       if (!acc[year][month]) acc[year][month] = [];
//       acc[year][month].push(consultation);

//       return acc;
//     }, {});
//   };

//   const consultationsByDate = groupConsultationsByDate(consultations);

//   const toggleFolder = (folderKey) => {
//     setOpenFolders((prev) => ({
//       ...prev,
//       [folderKey]: !prev[folderKey],
//     }));
//   };

//   return (
//     <div className="p-4">
//        <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-bold mb-4">Consultations</h1>
//         <Link href={`/dashboard/patients/${patientId}/consultations/new`}>
//           <button className="flex items-center gap-2 bg-violettitle text-white p-2 rounded">
//           <RiAddLine size={22} />
//             <span className="text-sm">New Consultation</span>
//           </button>
//         </Link>
//       </div>

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Nom</strong></TableCell>
//               <TableCell><strong>Propriétaire</strong></TableCell>
//               <TableCell><strong>Dernière visualisation</strong></TableCell>
//               <TableCell align="right"><strong>Actions</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {Object.entries(consultationsByDate).map(([year, months]) => (
//               <>
//                 <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
//                   <TableCell colSpan={4}>
//                     <FolderIcon style={{ marginRight: "8px" }} />
//                     {year}
//                   </TableCell>
//                 </TableRow>

//                 {openFolders[year] &&
//                   Object.entries(months).map(([month, consultations]) => (
//                     <>
//                       <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
//                         <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
//                           <FolderIcon style={{ marginRight: "8px" }} />
//                           {month}
//                         </TableCell>
//                       </TableRow>

//                       {openFolders[`${year}-${month}`] &&
//                         consultations.map((consultation) => (
//                           <TableRow key={consultation._id}>
//                             <TableCell style={{ paddingLeft: "64px" }}>
//                               <DescriptionIcon style={{ marginRight: "8px" }} />
//                               Consultation - {new Date(consultation.createdAt).toLocaleDateString("fr-FR")}
//                             </TableCell>
//                             <TableCell>{consultation.createdBy || "Inconnu"}</TableCell>
//                             <TableCell>{new Date(consultation.lastViewedAt || consultation.createdAt).toLocaleDateString("fr-FR")}</TableCell>
//                             <TableCell align="right">
//                               <Link
//                                 href={`/api/patients/${patientId}/consultations/${consultation._id}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <IconButton aria-label="voir le PDF">
//                                   <VisibilityIcon />
//                                 </IconButton>
//                               </Link>
//                               {/* <IconButton size="small">
//                                 <MoreVertIcon />
//                               </IconButton> */}
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
//     </div>
//   );
// };

// export default ConsultationsPage;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getConsultationsByPatientId } from "@/lib/actions";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RiAddLine } from "react-icons/ri";

const ConsultationsPage = ({ params }) => {
  const { id: patientId } = params;

  const [consultations, setConsultations] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchConsultations = async () => {
      if (patientId) {
        try {
          const data = await getConsultationsByPatientId(patientId);
          setConsultations(data);
        } catch (error) {
          console.error("Erreur lors du chargement des consultations :", error);
        }
      }
    };

    fetchConsultations();
  }, [patientId]);

  const groupConsultationsByDate = (consultations) => {
    return consultations.reduce((acc, consultation) => {
      const date = new Date(consultation.createdAt);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(consultation);

      return acc;
    }, {});
  };

  const consultationsByDate = groupConsultationsByDate(consultations);

  const toggleFolder = (folderKey) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const handleOpenModal = async (consultationId) => {
    try {
      const response = await fetch(`/api/patients/${patientId}/consultations/${consultationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setOpenModal(true);
    } catch (error) {
      console.error("Impossible d'afficher le PDF :", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Consultations</h1>
        <Link href={`/dashboard/patients/${patientId}/consultations/new`}>
          <button className="flex items-center gap-2 bg-violettitle text-white p-2 rounded">
            <RiAddLine size={22} />
            <span className="text-sm">Nouvelle Consultation</span>
          </button>
        </Link>
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
            {Object.entries(consultationsByDate).map(([year, months]) => (
              <>
                <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
                  <TableCell colSpan={4}>
                    <FolderIcon style={{ marginRight: "8px" }} />
                    {year}
                  </TableCell>
                </TableRow>

                {openFolders[year] &&
                  Object.entries(months).map(([month, consultations]) => (
                    <>
                      <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
                        <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
                          <FolderIcon style={{ marginRight: "8px" }} />
                          {month}
                        </TableCell>
                      </TableRow>

                      {openFolders[`${year}-${month}`] &&
                        consultations.map((consultation) => (
                          <TableRow key={consultation._id}>
                            <TableCell style={{ paddingLeft: "64px" }}>
                              <DescriptionIcon style={{ marginRight: "8px" }} />
                              Consultation - {new Date(consultation.createdAt).toLocaleDateString("fr-FR")}
                            </TableCell>
                            <TableCell>{consultation.createdBy || "Inconnu"}</TableCell>
                            <TableCell>{new Date(consultation.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell align="right">
                              <IconButton aria-label="voir le PDF" onClick={() => handleOpenModal(consultation._id)}>
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

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="lg" fullWidth>
        {/* <DialogTitle>Consultation PDF</DialogTitle> */}
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

export default ConsultationsPage;
