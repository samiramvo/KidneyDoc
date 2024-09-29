import { useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa"; // Import des icônes

const TableFilter = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      {/* Select by Doctor */}
      <div className="flex items-center space-x-2 bg-gray-100 px-2 rounded-full shadow-sm">
        <FaFilter className="text-gray-500" /> {/* Icône de filtre */}
        <select
          value={selectedDoctor}
          onChange={handleDoctorChange}
          className="bg-transparent focus:outline-none text-gray-600 border-none"
        >
          <option value="">Select by Doctor</option>
          <option value="DrVigan">Dr VIGAN</option>
          <option value="DrAgbangla">Dr Agbangla</option>
        </select>
      </div>

      {/* Sort by */}
      <div className="flex items-center space-x-2 bg-gray-100 px-2 rounded-full shadow-sm">
        <FaSort className="text-gray-500" /> {/* Icône de tri */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="bg-transparent focus:outline-none text-gray-600  border-none"
        >
          <option value="">Sort by</option>
          <option value="nameAsc">Name Ascending</option>
          <option value="nameDesc">Name Descending</option>
          <option value="dateAsc">Date Ascending</option>
          <option value="dateDesc">Date Descending</option>
        </select>
      </div>
    </div>
  );
};

export default TableFilter;
