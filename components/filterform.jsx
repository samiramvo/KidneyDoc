"use client";
import React from "react";

const FilterForm = () => {
  // const [filter, setFilter] = useState("");
  // const [doctor, setDoctor] = useState("");
  // const [doctors, setDoctors] = useState([]);

  // // Simuler une fonction pour récupérer la liste des docteurs
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     // Remplacez cette ligne par un appel réel à votre API pour récupérer les docteurs
  //     const doctorsList = [
  //       { id: "doc1", name: "Dr. Smith" },
  //       { id: "doc2", name: "Dr. Johnson" },
  //       // Ajoutez d'autres docteurs ici
  //     ];
  //     setDoctors(doctorsList);
  //   };

  //   fetchDoctors();
  // }, []);

  return (
    <form>
      <div>
        <label htmlFor="doctor">Filter by Doctor:</label>
        {/* <select id="doctor" value={doctor}>
          <option value="">-- Select --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select> */}
      </div>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterForm;
