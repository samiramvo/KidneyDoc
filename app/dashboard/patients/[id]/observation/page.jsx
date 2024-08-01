"use client";
import "@/styles/globals.css";
import "@/styles/globalelements.css";
import { useState } from "react";
// import { FaNotesMedical } from "react-icons/fa";
// import { fetchObservations } from "@/lib/data";
// import { addObservation } from "@/lib/actions";

const ObservationPage = ({ params }) => {
  const { id } = params;
  const [observations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientId: id,
    doctor: "",
    observation: "",
    kidneyFunction: "",
  });

  // useEffect(() => {
  //   const getObservations = async () => {
  //     const data = await fetchObservations(id);
  //     setObservations(data);
  //   };

  //   getObservations();
  // }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await addObservation(formData);
  //   if (response.ok) {
  //     alert("Observation submitted successfully!");
  //     setShowForm(false);
  //     setObservations([...observations, response.observation]);
  //   } else {
  //     alert("Error submitting observation");
  //   }
  // };

  return (
    <div className="observation-page">
      <div className="observation-list">
        {observations.map((obs) => (
          <div key={obs._id} className="observation">
            <h3>Observation by {obs.doctor}</h3>
            <p>{obs.observation}</p>
            <a
              href={`/pdfs/observation-${obs._id}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>

      <button onClick={() => setShowForm(!showForm)}>Add Observation</button>

      {showForm && (
        <div className="observation-form">
          {/* <form onSubmit={handleSubmit}> */}
          <form>
            <input type="hidden" name="patientId" value={formData.patientId} />
            <div className="flex flex-col">
              <label htmlFor="doctor" className="dark:text-[#A3AED0]">
                Doctor
              </label>
              <input
                type="text"
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="observation" className="dark:text-[#A3AED0]">
                Observation
              </label>
              <textarea
                id="observation"
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                required
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="kidneyFunction" className="dark:text-[#A3AED0]">
                Kidney Function
              </label>
              <input
                type="text"
                id="kidneyFunction"
                name="kidneyFunction"
                value={formData.kidneyFunction}
                onChange={handleChange}
                className="dark:bg-[#121212] dark:opacity-[80%] dark:border-none"
                required
              />
            </div>
            <button type="submit">Add Observation</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ObservationPage;
