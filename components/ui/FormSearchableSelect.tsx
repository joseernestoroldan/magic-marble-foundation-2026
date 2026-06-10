"use client";
import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./FormSearchableSelect.module.css";

type FormSearchableSelectProps<T> = {
  id: string;
  label: string;
  options: T[];
  value: string;
  onChange: (value: string) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  getSearchableText: (option: T) => string;
  renderOption?: (option: T) => React.ReactNode;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  disabled?: boolean;
};

export const FormSearchableSelect = <T,>({
  id,
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  getSearchableText,
  renderOption,
  placeholder = "Select",
  searchPlaceholder = "Search",
  error,
  disabled = false,
}: FormSearchableSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        getSearchableText(opt).toLowerCase().includes(search.toLowerCase())
      ),
    [options, search, getSearchableText]
  );

  const selectedOption = options.find(
    (opt) => getOptionValue(opt) === value
  );

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.relativeWrapper}>
        <button
          type="button"
          onClick={() => { if (!disabled) setOpen(!open); }}
          disabled={disabled}
          className={styles.trigger}
        >
          <span className={styles.triggerText}>
            {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          </span>
          <FaSearch className={styles.searchIcon} />
        </button>
        {open && (
          <div className={styles.dropdown}>
            <input
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <ul className={styles.list}>
              {filteredOptions.length === 0 ? (
                <li className={styles.noResults}>No results found.</li>
              ) : (
                filteredOptions.map((opt, index) => {
                  const optValue = getOptionValue(opt);
                  return (
                    <li
                      key={`${optValue}-${index}`}
                      className={styles.option}
                      onClick={() => {
                        onChange(optValue);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      {renderOption ? (
                        renderOption(opt)
                      ) : (
                        <span>{getOptionLabel(opt)}</span>
                      )}
                      {optValue === value && (
                        <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : null}
    </div>
  );
};
