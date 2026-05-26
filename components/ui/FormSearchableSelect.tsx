"use client";
import { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

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
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => { if (!disabled) setOpen(!open); }}
          disabled={disabled}
          className="flex w-[200px] items-center justify-between rounded-[5px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600 transition-colors duration-200"
        >
          <span className="truncate">
            {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          </span>
          <FaSearch className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-[200px] rounded-[5px] border border-gray-200 bg-white shadow-lg">
            <input
              className="w-full rounded-[5px] border-b border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-600"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <ul className="max-h-48 overflow-auto">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">No results found.</li>
              ) : (
                filteredOptions.map((opt, index) => {
                  const optValue = getOptionValue(opt);
                  return (
                    <li
                      key={`${optValue}-${index}`}
                      className="flex cursor-pointer items-center justify-between px-3 py-2 text-sm hover:bg-cyan-600 hover:text-white transition-colors duration-150"
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
                        <svg className="ml-auto h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <p className="text-sm text-red-500 mt-1">{error}</p>
      ) : null}
    </div>
  );
};
