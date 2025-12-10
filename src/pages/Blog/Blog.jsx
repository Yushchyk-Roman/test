import React, { useState } from "react";
import NavBar from "../../components/layout/nav-bar/NavBar.jsx";
import Footer from "../../components/layout/footer/Footer.jsx";
import Filter from "../../components/features/filter/Filter.jsx";
import BlogSection from "../../components/features/blogSection/BlogSection.jsx";
import tips from "../../data/tips.json"
import "./Blog.css";


const tipsCategory=[
  { label: "Всі", value: "all" },
  { label: "Кулінарні лайфхаки", value: "lifehacks" },
  { label: "Рекомендації по продуктах", value: "product-tips" },
  { label: "Тренди кулінарії", value: "trends" },
  { label: "Кухоннеі гаджети", value: "kitchen-gadgets" },
  { label: "Дієти та харчування", value: "nutrition" },
  { label: "Сезонні поради", value: "seasonal" },
  { label: "Техніки приготування", value: "cooking-techniques" },
  { label: "Збеігання продуктів", value: "food-storage" },
  { label: "Безпека на кухні", value: "kitchen-safety" }
]


const Blog = () => {
    const [selectedTip, setSelectedTip] = useState("all");

const filteredTips =
  selectedTip === "all" ?
  tips : tips.filter((tip)=> tip.category == selectedTip);

  return (
    <>
      <NavBar />

      <main className="blog-main">
        <Filter categories={tipsCategory} selectedCategory={selectedTip} onCategoryChange={setSelectedTip} />

        <section className="blog-section">
        <BlogSection tips={filteredTips}/>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
