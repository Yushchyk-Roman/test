import React, { useState, useEffect } from "react";
const CommentLikeButton = ({
  likesCount,
  initialIsLiked,
  commentId,
  recipeId,
  userId,
  onToggleLikeAPI,
}) => {
  const [liked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(likesCount);

  useEffect(() => {
    setLiked(initialIsLiked);
    setLikeCount(likesCount);
  }, [initialIsLiked, likesCount]);

  const handleToggleLike = async () => {
    const action = liked ? "unlike" : "like";

    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));

    const commentIdentifier = commentId ?? "N/A";
    console.log(`[API] Запит на ${action} коментаря ID: ${commentIdentifier}`);
    try {
      await onToggleLikeAPI(recipeId, commentId, userId, liked);
    } catch (error) {
      console.error(`Помилка під час ${action}:`, error);
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev + 1 : prev - 1));
      alert(`Помилка: ${error.message}`);
    }
  };

  return (
    <div className="like-comment">
      <button
        onClick={handleToggleLike}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "inherit",
        }}
      >
        <i
          className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          style={{ color: liked ? "#ff4d4f" : "#888" }}
        ></i>
      </button>
      <span style={{ color: "black" }}>{likeCount}</span>
    </div>
  );
};

export default CommentLikeButton;
