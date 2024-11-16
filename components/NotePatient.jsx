// "use client";
// import React, { useState, useEffect } from "react";
// import { NoteAdd, Eye, Trash } from "iconsax-react";
// import { addNote, fetchNotesByPatientId } from "@/lib/actions";
// import toast from "react-hot-toast";
// import jsPDF from "jspdf";

// const NotePatientComponent = ({ patientId }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [type, setType] = useState("");
//   const [description, setDescription] = useState("");
//   const [notes, setNotes] = useState([]);

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("patientId", patientId);
//       formData.append("title", title);
//       formData.append("type", type);
//       formData.append("description", description);

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
//       resetForm();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de la note :", error);
//       toast.error("Échec de l'ajout de la note.");
//     }
//   };

//   const handleViewNote = (note) => {
//     const doc = new jsPDF();
//     doc.text(`Title: ${note.title}`, 10, 10);
//     doc.text(`Type: ${note.type}`, 10, 20);
//     doc.text(`Description: ${note.description}`, 10, 30);
//     doc.save(`${note.title}.pdf`);
//   };

//   const resetForm = () => {
//     setTitle("");
//     setType("");
//     setDescription("");
//   };

//   return (
//     <div className="bg-background rounded-lg shadow-md p-6 mb-4 h-[300px]">
//       <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-4">Notes</h3>
//         <div
//           className="flex gap-2 cursor-pointer"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <NoteAdd size={24} className="text-violettitle" />
//           <p className="text-violettitle text-md">Add Note</p>
//         </div>
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
//                 {/* <p>{note.type}</p>
//                 <p>{note.description}</p> */}
//               </div>
//               <div className="flex gap-2">
//                 <Eye
//                   size={24}
//                   className="cursor-pointer"
//                   onClick={() => handleViewNote(note)}
//                 />
//                 <Trash
//                   size={24}
//                   className="cursor-pointer"
//                   onClick={() => handleArchiveNote(note._id)}
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex justify-center items-center text-md mt-10">
//             No notes added
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay-center">
//           <div className="bg-white p-6 rounded shadow-md w-1/3">
//             <h3 className="text-lg font-semibold mb-4">Add a note</h3>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full mb-2 p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value)}
//                 required
//                 className="w-full mb-2 p-2 border rounded"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//                 className="w-full mb-2 p-2 border rounded h-[100px]"
//               />

//               <div className="flex justify-end space-x-4 ">
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="bg-gray-300 p-2 rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-violettitle text-white p-2 rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotePatientComponent;
"use client";
import React, { useState, useEffect } from "react";
import { NoteAdd, Eye, Trash } from "iconsax-react";
import { addNote, fetchNotesByPatientId } from "@/lib/actions";
import toast from "react-hot-toast";
import PdfModal from "./NoteModal";

const NotePatientComponent = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await fetchNotesByPatientId(patientId);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Erreur lors de la récupération des notes :", error);
        toast.error("Échec de la récupération des notes.");
      }
    };

    fetchNotes();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("patientId", patientId);
      formData.append("title", title);
      formData.append("type", type);
      formData.append("description", description);

      const newNote = await addNote(formData);
      const simpleNote = {
        patientId: newNote.patientId.toString(),
        title: newNote.title,
        type: newNote.type,
        description: newNote.description,
        _id: newNote._id.toString(),
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt,
      };

      setNotes((prevNotes) => [...prevNotes, simpleNote]);
      toast.success("Note ajoutée avec succès !");
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
      toast.error("Échec de l'ajout de la note.");
    }
  };

  const handleViewNote = (note) => {
    setSelectedNote({
      ...note,
      patientId: note.patientId.toString(),
    });
    setIsPdfModalOpen(true);
  };

  const resetForm = () => {
    setTitle("");
    setType("");
    setDescription("");
  };

  return (
    <div className="bg-background rounded-lg shadow-md p-6 mb-4 h-[300px]">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-4">Notes</h3>
        <div
          className="flex gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <NoteAdd size={24} className="text-violettitle" />
          <p className="text-violettitle text-md">Add Note</p>
        </div>
      </div>

      <div className="mt-4">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">{note.title}</h4>
              </div>
              <div className="flex gap-2">
                <Eye
                  size={24}
                  className="cursor-pointer"
                  onClick={() => handleViewNote(note)}
                />
                <Trash size={24} className="cursor-pointer" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center text-md mt-10">
            No notes added
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add a note</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full mb-2 p-2 border rounded"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full mb-2 p-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="Consultation">Consultation</option>
                <option value="Suivi">Suivi</option>
                <option value="Évaluation">Évaluation</option>
                <option value="Rapport d'examen">Rapport d&apos;examen</option>
                <option value="Prescription">Prescription</option>
                <option value="Observation">Observation</option>
                <option value="Note de sortie">Note de sortie</option>
                <option value="Note d'admission">Note d&apos;admission</option>
                <option value="Note de transfert">Note de transfert</option>
              </select>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full mb-2 p-2 border rounded h-[100px]"
              />

              <div className="flex justify-end space-x-4 ">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-violettitle text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        note={selectedNote}
      />
    </div>
  );
};

export default NotePatientComponent;
