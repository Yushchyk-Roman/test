import React, { useState, useEffect } from "react";
import "./ControllPanel.css";

const ControllPanel = ({ selected, onChange, searchQuery, onSearchChange }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  const [isSortOpen, setIsSortOpen] = useState(false);

  const options = [
    { label: "Default", value: "default" },
    { label: "Alphabetical", value: "alphabetical" },
    { label: "By stars", value: "by_stars" },
    { label: "By Popularity", value: "by_popularity" },
  ];

  const handleSortChange = (value) => {
    onChange(value);
    setIsSortOpen(false);
  };

  return (
    <section className="controll-panel" aria-label="Searching panel">
      <form
        action="search"
        className="search-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          placeholder="type dish..."
          name="query"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </form>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isSortOpen}
        aria-label="Сортувати страви"
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="sort-button"
      >
        <span>Сортування</span>
        <i className="fa-solid fa-sort sort-icon" ></i>
      </button>

      {isSortOpen && (
        <ul
          className="sort-options"
          role="listbox"
          aria-label="Опції сортування"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected === option.label}
              className={selected === option.value ? "active" : ""}
              onClick={() => handleSortChange(option.value)}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <button className="change-theme" type="button" aria-label="Змінити тему" onClick={toggleTheme}>
        <i className={`fa-solid fa-sun ${theme === "light" ? "active" : ""}`}></i>
        <i className={`fa-solid fa-moon ${theme === "dark" ? "active" : ""}`}></i>
      </button>
    </section>
  );
};

export default ControllPanel;
