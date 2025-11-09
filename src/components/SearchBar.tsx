import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => (
  <div className="search-bar-container">
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      aria-label={placeholder || "Search"}
      autoComplete="off"
    />
  </div>
);

export default SearchBar;
