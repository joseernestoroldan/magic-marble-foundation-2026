"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      if (e.target.value) {
        e.target.value.length > 2 && params.set("query", e.target.value);
      } else {
        params.delete("query");
      }
      replace(`${pathName}?${params}`);
    },
    200
  );

  return (
    <div className="flex items-center gap-2 w-full sm:w-80 border border-gray-200 rounded-[5px] px-3 py-2 bg-white focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400 transition-all duration-200">
      <MdSearch className="text-gray-400 w-5 h-5 flex-shrink-0" />
      <input
        type="text"
        placeholder="Search for user..."
        className="flex-1 bg-transparent border-none text-gray-700 text-sm outline-none placeholder:text-gray-400"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
