import React from "react";
import "./CardComments.css";
import CommentLikeButton from "../CommentLikeButton";

const CardComments = ({
  comments,
  newCommentText,
  setNewCommentText,
  onSendComment,
  recipeId,
  onCommentLike,
  currentUserId,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSendComment();
    }
  };

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
                <img
                  src={
                    comment.avatar ||
                    "assets/images/default-user.png"
                  }
                  alt="author avatar"
                />
                <span>{comment.author}</span>
                <time dateTime={comment.date}>{comment.date}</time>
              </header>
              <p>{comment.text}</p>
              <CommentLikeButton
                recipeId={recipeId}
                userId={currentUserId}
                onToggleLikeAPI={onCommentLike}
                commentId={comment.id || index}
                likesCount={comment.likesCount || 0}
                initialIsLiked={comment.isLikedByUser || false}
              />
            </article>
          </li>
        ))}

        <li className="add-comment">
          <input
            placeholder="Add comment"
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="comment-button"
            onClick={onSendComment}
            disabled={newCommentText.trim() === ""}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CardComments;
