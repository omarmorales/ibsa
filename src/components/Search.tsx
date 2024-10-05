import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (value: string) => void;
  options: any[];
}

const Search: React.FC<SearchProps> = ({ onSearch, options }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "b") {
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center border border-gray-300 rounded-full mb-5">
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          placeholder="Buscar producto"
          className="p-2 pl-4 outline-none flex-grow rounded-l-full"
        />
        <div className="p-2 rounded-r-full">
          <SearchIcon size={24} />
        </div>
      </div>

      {options.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-10">
          <ul className="max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => setInputValue(option.name)} // Customize this based on your option structure
              >
                {option.name} {/* Adjust this to match your option data */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
