import { useState } from "react";

interface Props {
  searchTerm: string;
  placeholder?: string;
  setSearchTerm: (s: string) => void;
  searchBy: "ID" | "Name";
  setSearchBy: (value: "ID" | "Name") => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeholder = "Search patients",
  searchBy,
  setSearchBy,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="mb-4 relative w-[300px] max-sm:w-full">
      <div className="flex">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center bg-gray-100 border border-gray-300 rounded-l-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            {searchBy}
            <svg
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-full rounded-lg border bg-white shadow-lg z-10">
              {["ID", "Name"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSearchBy(option as "ID" | "Name");
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`${placeholder} by ${searchBy}`}
          className="flex-1 border border-gray-300 border-l-0 rounded-r-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
        />

        <div className="absolute right-3 top-[45%] -translate-y-1/2 text-gray-400 text-2xl pointer-events-none">
          ⌕
        </div>
      </div>
    </div>
  );
}
