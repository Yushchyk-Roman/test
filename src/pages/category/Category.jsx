import React, { useState, useEffect } from "react";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Footer from "../../components/layout/footer/Footer.jsx";
import ControllPanel from "../../components/features/controllPanel/ControllPanel.jsx";
import CardsBlock from "../../components/features/cardsBlock/CardsBlock.jsx";
import Filter from "../../components/features/filter/Filter.jsx";
import cards from "../../data/cards.json";
import "./Category.css";

import { getRecipes } from "../../services/recipeService"; 
import { getCategories } from "../../services/categoryService";

const Category = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [recipesData, categoriesData] = await Promise.all([
          getRecipes(),
          getCategories(),
        ]);
        const combinedRecipes = [...recipesData, ...cards];
        setRecipes(combinedRecipes);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Помилка завантаження даних:", err);
        setError("Не вдалося завантажити дані категорії.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  
  const filteredCards =
    selectedCategory === "all"
      ? recipes
      : recipes.filter((card) => card.type === selectedCategory);

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

  if (loading) {
      return (
          <div className="full-screen-center">
              <p>Завантаження категорій та рецептів...</p>
          </div>
      );
  }

  if (error) {
       return (
          <div className="full-screen-center error">
              <p>{error}</p>
          </div>
      );
  }

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
