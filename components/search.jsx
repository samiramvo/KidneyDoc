"use client";

import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import '@/styles/globals.css'

const Search = ({ placeholder }) => {
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
        <div className="containersearch">
            <MdSearch />
            <input
                type="text"
                className="inputsearch"
                placeholder={placeholder}
                onChange={handleSearch}
            />
        </div>
    );
};

export default Search;