"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import styles from "./Search.module.css";

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
    <div className={styles.wrapper}>
      <MdSearch className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search for user..."
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
