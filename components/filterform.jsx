import { useState, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";

const TableFilter = ({ onFilterChange = () => {} }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch('/api/doctorslist');
      if (!response.ok) {
        console.error("Failed to fetch doctors:", response.statusText);
        return;
      }
      const data = await response.json();
      setDoctors(data.doctors || []);
    };
    fetchDoctors();
  }, []);

  const handleDoctorChange = (event) => {
    const newDoctor = event.target.value;
    setSelectedDoctor(newDoctor);
    onFilterChange({ doctor: newDoctor, sort: sortOption });
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSortOption(newSort);
    onFilterChange({ doctor: selectedDoctor, sort: newSort });
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 items-center">
      {/* Select by Doctor */}
      <div className="flex items-center space-x-2 bg-gray-100 px-2 rounded-full dark:border dark:border-gray-300 shadow-sm dark:bg-darkgris">
        <FaFilter className="text-gray-500" />
        <select
          value={selectedDoctor}
          onChange={handleDoctorChange}
          className="bg-transparent dark:bg-darkgris focus:outline-none text-gray-600  dark:text-white border-none"
        >
          <option value="">Select by Doctor</option>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <option key={doctor} value={doctor}>
                {doctor}
              </option>
            ))
          ) : (
            <option value="">No doctors available</option>
          )}
        </select>
      </div>

      {/* Sort by */}
      <div className="flex items-center space-x-2 bg-gray-100 px-2 rounded-full dark:border dark:border-gray-300 shadow-sm dark:bg-darkgris">
        <FaSort className="text-gray-500" />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="bg-transparent dark:bg-darkgris focus:outline-none text-gray-600 dark:text-white border-none"
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