import { useState } from "react";

const TableFilter = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className=" flex flex-col md:flex-row gap-3 items-center">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium ">Select by Doctor</label>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="mt-1 block w-64 pl-2 pr-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-black text-gray-600"
          >
            <option value="">Select By Doctor</option>
            <option value="USA">Dr VIGAN</option>
            <option value="Canada">Dr Agbangla</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium ">Sort by</label>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="mt-1 block w-64 pl-2 pr-3 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-black text-gray-600"
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
