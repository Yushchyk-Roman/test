import React from "react";
import Card from "../../cards/CardTemplate.jsx";

import "./BlogSection.css";
const BlogSection = ({tips}) => {
  return (
    <>
      <header className="blog-header">
        <h2> Blog and tips</h2>
        <hr />
        <p>Корисні поради, лайфхаки та тренди від досвідчених кухарів</p>
      </header>

      <article className="hook-pannel">
        <hr />
        <h5 className="blog-article-title">
          10 Tips for Perfect Pasta Every Time
        </h5>
        <p className="blog-article-excerpt">
          Master the art of pasta making with these essential tips from our
          expert chefs.
        </p>
        <button className="read-more-button">Read More</button>
      </article>

      <div className="tips-block">
        {tips.map((tip, index) => (
          <Card
            key={index}
            data={tip}
            type={"blog"}
          />
        ))}
      </div>
    </>
  );
};

export default BlogSection;
