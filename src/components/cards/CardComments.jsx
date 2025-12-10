import React from "react";
import "./CardComments.css";

const CardComments = ({ comments }) => {
  return (
    <div className="comments">
      <p className="comment-header">Comments</p>
      <ul>
        {comments.length === 0 && (
          <li>
            <p className="noComments">No comments yet</p>{" "}
          </li>
        )}
        {comments.map((comment, index) => (
          <li key={index}>
            <article>
              <header>
                <img src={comment.avatar} alt="author avatar" />
                <span>{comment.author}</span>
                <time dateTime={comment.date}>{comment.date}</time>
              </header>
              <p>{comment.text}</p>
              <div className="like-comment">
                <i className="fa-solid fa-heart"></i>
              </div>
            </article>
          </li>
        ))}

        <li className="add-comment">
          <input placeholder="Add comment" type="text" />
        </li>
      </ul>
    </div>
  );
};

export default CardComments;
