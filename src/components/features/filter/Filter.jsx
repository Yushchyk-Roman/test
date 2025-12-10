import React from "react";
import "./Filter.css";

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <aside className="filter">
      <ul>
        {categories.map(category => (
          <li
            key={category.value}
            className="category-item"
          >
            <button
              onClick={() => onCategoryChange(category.value)}
              className={`category-link  ${
              selectedCategory === category.value ? "active" : ""
            }`}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Filter;
