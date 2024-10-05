import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch: (value: string) => void;
  options: any[];
}

const Search: React.FC<SearchProps> = ({ onSearch, options }) => {
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500); // 500ms delay for debounce

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onSearch]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (options.length === 0 || !inputRef.current?.contains(document.activeElement)) return;

      if (event.key === "ArrowDown") {
        setHighlightedIndex((prev) =>
          prev === null || prev === options.length - 1 ? 0 : prev + 1
        );
      }
      if (event.key === "ArrowUp") {
        setHighlightedIndex((prev) =>
          prev === null || prev === 0 ? options.length - 1 : prev - 1
        );
      }
      if (event.key === "Enter" && highlightedIndex !== null) {
        setInputValue(options[highlightedIndex].name);
        setHighlightedIndex(null); // Close dropdown after selection
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (input) {
        input.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [highlightedIndex, options]);

  // Global listener for "/" key to focus the input
  useEffect(() => {
    const handleSlashKey = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus(); // Focus the input when "/" is pressed
      }
    };

    document.addEventListener("keydown", handleSlashKey);

    return () => {
      document.removeEventListener("keydown", handleSlashKey);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setHighlightedIndex(null); // Reset highlighted index when typing
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center border border-gray-300 rounded-full mb-5">
        <input
          ref={inputRef}
          type="text"
          onChange={handleInputChange}
          placeholder='Escribe "/" para buscar'
          className="p-2 pl-4 outline-none flex-grow rounded-l-full"
          value={inputValue}
          tabIndex={0} // Ensure input is focusable
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
                className={`p-3 hover:bg-gray-100 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-200" : ""
                }`}
                onClick={() => setInputValue(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;