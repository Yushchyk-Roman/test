import {React, useState} from "react"
import "./BlogCard.css"

const BlogCard =(data) =>{
    const {
        title,
        image,
        label,
        readingTime,
        description,
        author,
        date,
        views,
        comments,
    }= data;

    return(
        <>
        <div className="blog-card">
        <img src={image} alt={title} />
        <span className="category">{label}</span>
        <span className="reading-time">{readingTime}</span>
        <h5>{title}</h5>
        <p>{description}</p>
        <div className="blog-meta">
          <span className="author">{author}</span>
          <span className="date">{date}</span>
        </div>
        <div className="stats">
          <i className="fa-solid fa-eye"></i> {views}
          <i className="fa-solid fa-comment"></i> {comments}
        </div>
      </div>
        </>
    );
};

export default BlogCard;
