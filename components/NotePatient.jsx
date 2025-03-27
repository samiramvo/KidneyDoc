
// import React, { useState, useEffect } from "react";
// import { Eye, Trash } from "iconsax-react";
// import { addNote, fetchNotesByPatientId } from "@/lib/actions";
// import toast from "react-hot-toast";
// import PdfModal from "./NoteModal";
// import Modal from "./modalform"; // Assurez-vous que le chemin est correct
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MdNoteAdd, MdOutlineNoteAdd } from "react-icons/md";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "./ui/button";

// const NotePatientComponent = ({ patientId }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formSchema = z.object({
//     title: z.string().min(1, "Le titre est requis"),
//     type: z.string().min(1, "Le type est requis"),
//     description: z.string().min(1, "La description est requise"),
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       type: "",
//       description: "",
//     },
//   });

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const fetchedNotes = await fetchNotesByPatientId(patientId);
//         setNotes(fetchedNotes);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des notes :", error);
//         toast.error("Échec de la récupération des notes.");
//       }
//     };

//     fetchNotes();
//   }, [patientId]);

//   const handleSubmit = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("patientId", patientId);
//       formData.append("title", values.title);
//       formData.append("type", values.type);
//       formData.append("description", values.description);
//       setIsSubmitting(true);

//       const newNote = await addNote(formData);
//       const simpleNote = {
//         patientId: newNote.patientId.toString(),
//         title: newNote.title,
//         type: newNote.type,
//         description: newNote.description,
//         _id: newNote._id.toString(),
//         createdAt: newNote.createdAt,
//         updatedAt: newNote.updatedAt,
//       };

//       setNotes((prevNotes) => [...prevNotes, simpleNote]);
//       toast.success("Note ajoutée avec succès !");
//       form.reset();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la note :", error);
//       toast.error("Échec de l'ajout de la note.");
//     }
//    finally {
//     setIsSubmitting(false);
//   }
//   };

//   const handleViewNote = (note) => {
//     setSelectedNote({
//       ...note,
//       patientId: note.patientId.toString(),
//     });
//     setIsPdfModalOpen(true);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Notes</h3>
//         {/* <div
//           className="flex gap-2 cursor-pointer"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <NoteAdd size={24} className="text-violettitle" />
//           <p className="text-violettitle text-md">Add Note</p>
          
//         </div> */}
//         <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-violettitle text-white p-2 rounded">
//           <MdOutlineNoteAdd size={22} />
//             <span className="text-sm">Add Note</span>
//           </button>
//       </div>

//       <div className="mt-4">
//         {notes.length > 0 ? (
//           notes.map((note, index) => (
//             <div
//               key={index}
//               className="border-b py-2 flex justify-between items-center"
//             >
//               <div>
//                 <h4 className="font-bold">{note.title}</h4>
//               </div>
//               <div className="flex gap-2">
//                 <Eye
//                   size={24}
//                   className="cursor-pointer"
//                   onClick={() => handleViewNote(note)}
//                 />
//                 <Trash size={24} className="cursor-pointer" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center items-center text-md mt-10">
//             No notes added
//           </div>
//         )}
//       </div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="modal-form-container max-h-screen font-jakarta dark:bg-darkbackground">
//           <div className="modal-form-header flex gap-2 ">
//             <div className="modal-form-logo">
//               <span className="mr-4">
//                 <MdNoteAdd size={28} className="text-violettitle dark:text-white" />
//               </span>
//             </div>
//             <div className="modal-form-role flex flex-align-item-center  pb-4">
//               <p className="text-lg text-violettitle font-bold dark:text-white">
//                 Add a Note
//               </p>
//             </div>
//           </div>
//           <div className="modal-form-body">
//             <div >
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)} className="form-layout">
//                   <div className="form-row w-[100%] mb-4">
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Titre
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 type="text"
//                                 placeholder="Title"
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="type"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Type
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <select
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               >
//                                 <option value="">Select Type</option>
//                                 <option value="Consultation">Consultation</option>
//                                 <option value="Suivi">Suivi</option>
//                                 <option value="Évaluation">Évaluation</option>
//                                 <option value="Rapport d'examen">Rapport d&apos;examen</option>
//                                 <option value="Prescription">Prescription</option>
//                                 <option value="Observation">Observation</option>
//                                 <option value="Note de sortie">Note de sortie</option>
//                                 <option value="Note d'admission">Note dd&apos;admission</option>
//                                 <option value="Note de transfert">Note de transfert</option>
//                               </select>
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Description
//                           <span className="text-red-500 text-[18px]">
//                             *
//                           </span>
//                         </FormLabel>
//                         <FormControl>
//                           <textarea
//                             placeholder="Description"
//                             className="w-full mb-2 p-2 border rounded h-[100px]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                       </FormItem>
//                     )}
//                   />
                  
//                     <Button
//                     type="submit"
//                     className={`w-[20%] rounded-[20px] px-2 py-2 text-[15px] ml-4  bg-violettitle text-white ${
//                       isSubmitting
//                         ? "opacity-85 cursor-not-allowed"
//                         : "bg-violettitle hover:bg-violettitle dark:bg-darkgris dark:hover:bg-darkviolet "
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <LoaderCircle size={30} className="animate-spin" />
//                     ) : (
//                       "Create"
//                     )}
//                   </Button>
                
//                 </form>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </Modal>

//       <PdfModal
//         isOpen={isPdfModalOpen}
//         onClose={() => setIsPdfModalOpen(false)}
//         note={selectedNote}
//       />
//     </div>
//   );
// };

// export default NotePatientComponent;

// import React, { useState, useEffect } from "react";
// import { Eye, Trash } from "iconsax-react";
// import { addNote, fetchNotesByPatientId } from "@/lib/actions";
// import toast from "react-hot-toast";
// import PdfModal from "./NoteModal";
// import Modal from "./modalform"; // Assurez-vous que le chemin est correct
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MdNoteAdd, MdOutlineNoteAdd } from "react-icons/md";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "./ui/button";

// const NotePatientComponent = ({ patientId }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formSchema = z.object({
//     title: z.string().min(1, "Le titre est requis"),
//     type: z.string().min(1, "Le type est requis"),
//     description: z.string().min(1, "La description est requise"),
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       type: "",
//       description: "",
//     },
//   });

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const fetchedNotes = await fetchNotesByPatientId(patientId);
//         setNotes(fetchedNotes);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des notes :", error);
//         toast.error("Échec de la récupération des notes.");
//       }
//     };

//     fetchNotes();
//   }, [patientId]);

//   const handleSubmit = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("patientId", patientId);
//       formData.append("title", values.title);
//       formData.append("type", values.type);
//       formData.append("description", values.description);
//       setIsSubmitting(true);

//       const newNote = await addNote(formData);
//       const simpleNote = {
//         patientId: newNote.patientId.toString(),  // Convertir ObjectId en string
//         title: newNote.title,
//         type: newNote.type,
//         description: newNote.description,
//         _id: newNote._id.toString(),  // Convertir ObjectId en string
//         createdAt: newNote.createdAt.toISOString(), // Convertir Date en string ISO
//         updatedAt: newNote.updatedAt.toISOString(), // Convertir Date en string ISO
//       };
      

//       setNotes((prevNotes) => [...prevNotes, simpleNote]);
//       toast.success("Note ajoutée avec succès !");
//       form.reset();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la note :", error);
//       toast.error("Échec de l'ajout de la note.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewNote = (note) => {
//     setSelectedNote({
//       ...note,
//       patientId: note.patientId.toString(),
//     });
//     setIsPdfModalOpen(true);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Notes</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-violettitle text-white p-2 rounded"
//         >
//           <MdOutlineNoteAdd size={22} />
//           <span className="text-sm">Add Note</span>
//         </button>
//       </div>

//       <div className="mt-4">
//         {notes.length > 0 ? (
//           notes.map((note, index) => (
//             <div
//               key={index}
//               className="border-b py-2 flex justify-between items-center"
//             >
//               <div>
//                 <h4 className="font-bold">{note.title}</h4>
//               </div>
//               <div className="flex gap-2">
//                 <Eye
//                   size={24}
//                   className="cursor-pointer"
//                   onClick={() => handleViewNote(note)}
//                 />
//                 <Trash size={24} className="cursor-pointer" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center items-center text-md mt-10">
//             No notes added
//           </div>
//         )}
//       </div>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="modal-form-container max-h-screen font-jakarta dark:bg-darkbackground">
//           <div className="modal-form-header flex gap-2 ">
//             <div className="modal-form-logo">
//               <span className="mr-4">
//                 <MdNoteAdd
//                   size={28}
//                   className="text-violettitle dark:text-white"
//                 />
//               </span>
//             </div>
//             <div className="modal-form-role flex flex-align-item-center  pb-4">
//               <p className="text-lg text-violettitle font-bold dark:text-white">
//                 Add a Note
//               </p>
//             </div>
//           </div>
//           <div className="modal-form-body">
//             <div>
//               <Form {...form}>
//                 <form
//                   onSubmit={form.handleSubmit(handleSubmit)}
//                   className="form-layout"
//                 >
//                   <div className="form-row w-[100%] mb-4">
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>
//                               Titre
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 type="text"
//                                 placeholder="Title"
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="type"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>
//                               Type
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <select
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               >
//                                 <option value="">Select Type</option>
//                                 <option value="Consultation">Consultation</option>
//                                 <option value="Suivi">Suivi</option>
//                                 <option value="Évaluation">Évaluation</option>
//                                 <option value="Rapport d'examen">
//                                   Rapport d&apos;examen
//                                 </option>
//                                 <option value="Prescription">Prescription</option>
//                                 <option value="Observation">Observation</option>
//                                 <option value="Note de sortie">Note de sortie</option>
//                                 <option value="Note d'admission">
//                                   Note dd&apos;admission
//                                 </option>
//                                 <option value="Note de transfert">
//                                   Note de transfert
//                                 </option>
//                               </select>
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>
//                           Description
//                           <span className="text-red-500 text-[18px]">
//                             *
//                           </span>
//                         </FormLabel>
//                         <FormControl>
//                           <textarea
//                             placeholder="Description"
//                             className="w-full mb-2 p-2 border rounded h-[100px]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     className={`w-[20%] rounded-[20px] px-2 py-2 text-[15px] ml-4  bg-violettitle text-white ${
//                       isSubmitting
//                         ? "opacity-85 cursor-not-allowed"
//                         : "bg-violettitle hover:bg-violettitle dark:bg-darkgris dark:hover:bg-darkviolet "
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <LoaderCircle size={30} className="animate-spin" />
//                     ) : (
//                       "Create"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </Modal>
//       <PdfModal
//         isOpen={isPdfModalOpen}
//         onClose={() => setIsPdfModalOpen(false)}
//         note={selectedNote}
//       />
//     </div>
//   );
// };

// export default NotePatientComponent;
// "use client"
// import React, { useState, useEffect } from "react";
// import { addNote, fetchNotesByPatientId } from "@/lib/actions";
// import toast from "react-hot-toast";
// import PdfModal from "./NoteModal";
// import Modal from "./modalform"; 
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MdNoteAdd, MdOutlineNoteAdd } from "react-icons/md";
// import { LoaderCircle } from "lucide-react";
// import { Button } from "./ui/button";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
// import DescriptionIcon from "@mui/icons-material/Description";
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const NotePatientComponent = ({ patientId , currentUser}) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
//   const [notes, setNotes] = useState([]);
//   const [selectedNote, setSelectedNote] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [openFolders, setOpenFolders] = useState({});

//   const formSchema = z.object({
//     title: z.string().min(1, "Le titre est requis"),
//     type: z.string().min(1, "Le type est requis"),
//     description: z.string().min(1, "La description est requise"),
//   });

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       type: "",
//       description: "",
//     },
//   });

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const fetchedNotes = await fetchNotesByPatientId(patientId);
//         setNotes(fetchedNotes);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des notes :", error);
//         toast.error("Échec de la récupération des notes.");
//       }
//     };

//     fetchNotes();
//   }, [patientId]);

//   const handleSubmit = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("patientId", patientId);
//       formData.append("title", values.title);
//       formData.append("type", values.type);
//       formData.append("description", values.description);
//       setIsSubmitting(true);

//       const newNote = await addNote(formData , currentUser?.username);
//       // const simpleNote = {
//       //   patientId: newNote.patientId.toString(),
//       //   title: newNote.title,
//       //   type: newNote.type,
//       //   description: newNote.description,
//       //   _id: newNote._id.toString(),
//       //   createdAt: newNote.createdAt.toISOString(),
//       //   updatedAt: newNote.updatedAt.toISOString(),
//       // };
      
//       setNotes((prevNotes) => [...prevNotes, ...newNote]);
//       toast.success("Note ajoutée avec succès !");
//       form.reset();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la note :", error);
//       toast.error("Échec de l'ajout de la note.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewNote = (note) => {
//     setSelectedNote({
//       ...note,
//       patientId: note.patientId.toString(),
//     });
//     setIsPdfModalOpen(true);
//   };

//   const groupNotesByDate = (notes) => {
//     return notes.reduce((acc, note) => {
//       const date = new Date(note.createdAt);
//       const year = date.getFullYear();
//       const month = date.toLocaleString("default", { month: "long" });

//       if (!acc[year]) acc[year] = {};
//       if (!acc[year][month]) acc[year][month] = [];
//       acc[year][month].push(note);

//       return acc;
//     }, {});
//   };

//   const notesByDate = groupNotesByDate(notes);

//   const toggleFolder = (folderKey) => {
//     setOpenFolders((prev) => ({
//       ...prev,
//       [folderKey]: !prev[folderKey],
//     }));
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Notes</h3>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 bg-violettitle text-white p-2 rounded"
//         >
//           <MdOutlineNoteAdd size={22} />
//           <span className="text-sm">Add Note</span>
//         </button>
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
//             {Object.entries(notesByDate).map(([year, months]) => (
//               <>
//                 <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
//                   <TableCell colSpan={4}>
//                     <FolderIcon style={{ marginRight: "8px" }} />
//                     {year}
//                   </TableCell>
//                 </TableRow>

//                 {openFolders[year] &&
//                   Object.entries(months).map(([month, notes]) => (
//                     <>
//                       <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
//                         <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
//                           <FolderIcon style={{ marginRight: "8px" }} />
//                           {month}
//                         </TableCell>
//                       </TableRow>

//                       {openFolders[`${year}-${month}`] &&
//                         notes.map((note) => (
//                           <TableRow key={note._id}>
//                             <TableCell style={{ paddingLeft: "64px" }}>
//                               <DescriptionIcon style={{ marginRight: "8px" }} />
//                               {note.title}
//                             </TableCell>
//                             <TableCell>{note.createdBy || "Inconnu"}</TableCell>
//                             <TableCell>{new Date(note.updatedAt || note.createdAt).toLocaleDateString("fr-FR")}</TableCell>
//                             <TableCell align="right">
//                               <IconButton aria-label="voir le PDF" onClick={() => handleViewNote(note)}>
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
//                 <MdNoteAdd size={28} className="text-violettitle dark:text-white" />
//               </span>
//             </div>
//             <div className="modal-form-role flex flex-align-item-center  pb-4">
//               <p className="text-lg text-violettitle font-bold dark:text-white">
//                 Add a Note
//               </p>
//             </div>
//           </div>
//           <div className="modal-form-body">
//             <div>
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(handleSubmit)} className="form-layout">
//                   <div className="form-row w-[100%] mb-4">
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="title"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>
//                               Titre
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <input
//                                 type="text"
//                                 placeholder="Title"
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               />
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <div className="w-[48%]">
//                       <FormField
//                         control={form.control}
//                         name="type"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>
//                               Type
//                               <span className="text-red-500 text-[18px]">
//                                 *
//                               </span>
//                             </FormLabel>
//                             <FormControl>
//                               <select
//                                 className="w-full mb-2 p-2 border rounded"
//                                 {...field}
//                               >
//                                 <option value="">Select Type</option>
//                                 <option value="Consultation">Consultation</option>
//                                 <option value="Suivi">Suivi</option>
//                                 <option value="Évaluation">Évaluation</option>
//                                 <option value="Rapport d'examen">
//                                   Rapport d&apos;examen
//                                 </option>
//                                 <option value="Prescription">Prescription</option>
//                                 <option value="Observation">Observation</option>
//                                 <option value="Note de sortie">Note de sortie</option>
//                                 <option value="Note d'admission">
//                                   Note d&apos;admission
//                                 </option>
//                                 <option value="Note de transfert">
//                                   Note de transfert
//                                 </option>
//                               </select>
//                             </FormControl>
//                             <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>
//                           Description
//                           <span className="text-red-500 text-[18px]">
//                             *
//                           </span>
//                         </FormLabel>
//                         <FormControl>
//                           <textarea
//                             placeholder="Description"
//                             className="w-full mb-2 p-2 border rounded h-[100px]"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage className="text-red-400 dark:text-red-700 font-medium" />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     type="submit"
//                     className={`w-[20%] rounded-[20px] px-2 py-2 text-[15px] ml-4  bg-violettitle text-white ${
//                       isSubmitting
//                         ? "opacity-85 cursor-not-allowed"
//                         : "bg-violettitle hover:bg-violettitle dark:bg-darkgris dark:hover:bg-darkviolet "
//                     }`}
//                   >
//                     {isSubmitting ? (
//                       <LoaderCircle size={30} className="animate-spin" />
//                     ) : (
//                       "Create"
//                     )}
//                   </Button>
//                 </form>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </Modal>

//       <PdfModal
//         isOpen={isPdfModalOpen}
//         onClose={() => setIsPdfModalOpen(false)}
//         note={selectedNote}
//       />
//     </div>
//   );
// };

// export default NotePatientComponent;

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { fetchNotesByPatientId } from "@/lib/actions";

const NotePatientComponent = ({ patientId }) => {
  const [notes, setNotes] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await fetchNotesByPatientId(patientId);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Erreur lors du chargement des notes :", error);
        toast.error("Échec de la récupération des notes.");
      }
    };

    fetchNotes();
  }, [patientId]);

  const groupNotesByDate = (notes) => {
    return notes.reduce((acc, note) => {
      const date = new Date(note.createdAt);
      const year = date.getFullYear();
      const month = date.toLocaleString("default", { month: "long" });

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];
      acc[year][month].push(note);

      return acc;
    }, {});
  };

  const notesByDate = groupNotesByDate(notes);

  const toggleFolder = (folderKey) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey],
    }));
  };

  const handleOpenModal = async (noteId) => {
    try {
      const response = await fetch(`/api/patients/${patientId}/notes/${noteId}`, {
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
            {Object.entries(notesByDate).map(([year, months]) => (
              <>
                <TableRow key={year} onClick={() => toggleFolder(year)} style={{ cursor: "pointer" }}>
                  <TableCell colSpan={4}>
                    <FolderIcon style={{ marginRight: "8px" }} />
                    {year}
                  </TableCell>
                </TableRow>

                {openFolders[year] &&
                  Object.entries(months).map(([month, notes]) => (
                    <>
                      <TableRow key={month} onClick={() => toggleFolder(`${year}-${month}`)} style={{ cursor: "pointer" }}>
                        <TableCell colSpan={4} style={{ paddingLeft: "32px" }}>
                          <FolderIcon style={{ marginRight: "8px" }} />
                          {month}
                        </TableCell>
                      </TableRow>

                      {openFolders[`${year}-${month}`] &&
                        notes.map((note) => (
                          <TableRow key={note._id}>
                            <TableCell style={{ paddingLeft: "64px" }}>
                              <DescriptionIcon style={{ marginRight: "8px" }} />
                              {note.title}
                            </TableCell>
                            <TableCell>{note.createdBy || "Inconnu"}</TableCell>
                            <TableCell>{new Date( note.createdAt).toLocaleDateString("fr-FR")}</TableCell>
                            <TableCell align="right">
                              <IconButton aria-label="voir le PDF" onClick={() => handleOpenModal(note._id)}>
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

export default NotePatientComponent;
