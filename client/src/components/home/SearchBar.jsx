// Search bar component

import { useState, useEffect } from 'react';
import searchImg from '../../assets/images/Search.png';

function SearchBar({ onSearch, suggestions = [], onSelectSuggestion }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const triggerSearch = () => {
    onSearch(query);
    setShowSuggestions(false);
  };

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => onSearch(query), 250);
    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div className="flex justify-center w-full">
      {/* Search container */}
      <div className="relative w-full max-w-3xl mx-auto">

        {/* Search Icon */}
        <button
          type="button"
          onClick={triggerSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <img src={searchImg} alt="Search Icon" className="h-6 w-6" />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Search topics..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              triggerSearch();
            }
          }}
          className="
            w-full pl-4 pr-12 py-2 text-sm rounded-lg bg-slate-900/60
            border border-slate-700 text-white
            placeholder:text-white/40
            focus:outline-none focus:ring-1 focus:ring-teal-400
          "
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            className="
              absolute left-0 right-0 
              bg-slate-900 rounded-lg mt-2 
              shadow-xl z-20
              max-h-56 overflow-y-auto
            "
          >
            {suggestions.map((item) => (
              <button
                key={item._id}
                onClick={() => {
                  onSelectSuggestion(item.title);
                  setQuery(item.title);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-800"
              >
                {item.title}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default SearchBar;
