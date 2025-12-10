import React, { useState } from "react";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Footer from "../../components/layout/footer/Footer.jsx";
import ControllPanel from "../../components/features/ControllPanel/ControllPanel.jsx";
import CardsBlock from "../../components/features/cardsBlock/CardsBlock.jsx";
import Filter from "../../components/features/filter/Filter.jsx";
import cards from "../../data/cards.json";
import categories from "../../data/category.json"
import "./Category.css";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCards =
    selectedCategory === "all"
      ? cards
      : cards.filter((card) => card.type === selectedCategory);

  const searchedCards = filteredCards.filter((card) => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTitle =
    selectedCategory === "all"
      ? "All dishes"
      : categories.find((category) => category.value === selectedCategory)
          ?.label || "Unknown Category";

  const sortedCards = [...searchedCards].sort((a, b) => {
    switch (selectedSort) {
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "by_stars":
        return b.stars - a.stars;
      case "by_popularity":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });
  return (
    <>
      <NavBar />
      <ControllPanel
        selected={selectedSort}
        onChange={setSelectedSort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="category-page">
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <CardsBlock title={selectedTitle} cards={sortedCards} />
      </main>

      <Footer />
    </>
  );
};

export default Category;
