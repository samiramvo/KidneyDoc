"use client";
import { MdSearch } from "react-icons/md";
import "@/styles/globals.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder, namelabel }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium pl-2">{namelabel}</label>
      <div className=" flex items-center   relative ">
        <MdSearch className="absolute left-3 right-3 text-lg text-black dark:text-black " />
        <input
          type="text"
          placeholder={placeholder}
          className="mt-1 block w-full pl-7 pr-3 py-2 text-base border border-gray-300   opacity-50 rounded-md shadow-sm focus:outline-none dark:text-black"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
