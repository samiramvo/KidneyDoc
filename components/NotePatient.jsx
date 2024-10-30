"use client";
import React, { useState, useEffect } from "react";
import { NoteAdd } from "iconsax-react";
import { addNote } from "@/lib/actions";
import toast from "react-hot-toast";

const NotePatientComponent = ({ patientId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);

  // Fetch existing notes (example, adapt according to your data fetching logic)
  useEffect(() => {
    const fetchNotes = async () => {
      // Implémentez votre logique pour récupérer les notes
      // setNotes(fetchedNotes);
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
      setNotes((prevNotes) => [...prevNotes, newNote]); // Utiliser la fonction de mise à jour d'état
      toast.success("Note ajoutée avec succès !");
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
      toast.error("Échec de l'ajout de la note.");
    }
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
            <div key={index} className="border-b py-2">
              <h4 className="font-bold">{note.title}</h4>
              <p>{note.type}</p>
              <p>{note.description}</p>
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
              <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full mb-2 p-2 border rounded"
              />
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
    </div>
  );
};

export default NotePatientComponent;
