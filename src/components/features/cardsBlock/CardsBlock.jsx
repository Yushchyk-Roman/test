import { React, useState, useEffect } from "react";
import Card from "../../cards/CardTemplate";
import Form from "../../form/RecipeForm.jsx"; // Імпорт форми
import "./CardsBlock.css";
import { useAuth } from "../../../context/AuthContext.jsx"; // Імпорт контексту авторизації
import {
  addRecipeComment,
  deleteRecipe,
  updateRecipe,
  createRecipe,
} from "../../../services/recipeService.js";
import { uploadFile } from "../../../services/storageService.js";

const CardsBlock = ({ title, cards, allowCreation = false }) => {
  const { currentUser } = useAuth(); // Отримуємо користувача
  const [currentCards, setCurrentCards] = useState(cards);
  
  // Стани для UI та маніпуляцій
  const [openCard, setOpenedCard] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // Режим перегляду
  const [isModalOpen, setIsModalOpen] = useState(false); // Модалка
  const [editingRecipe, setEditingRecipe] = useState(null); // Рецепт, що редагується
  const [isSaving, setIsSaving] = useState(false); // Стан збереження

  useEffect(() => {
    setCurrentCards(cards);
  }, [cards]);

  // --- Методи маніпуляції (як у UserCards) ---

  const handleEdit = (cardData) => {
    setEditingRecipe(cardData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleDelete = async (recipeId) => {
    if (!currentUser) return;
    
    const confirmed = window.confirm(
      "Ви впевнені, що хочете видалити цей рецепт? Це неможливо скасувати."
    );
    if (!confirmed) return;

    try {
      await deleteRecipe(recipeId);

      setCurrentCards((prevCards) =>
        prevCards.filter((card) => card.id !== recipeId)
      );

      if (openCard === recipeId) {
        setOpenedCard(null);
      }

      console.log("Рецепт успішно видалено:", recipeId);
    } catch (error) {
      console.error("Помилка видалення рецепта:", error);
      alert("Помилка при видаленні рецепта. Спробуйте пізніше.");
    }
  };

  const handleSave = async (data, imageFile) => {
    if (!currentUser || isSaving) return;
    setIsSaving(true);

    const authorName =
      currentUser.displayName || currentUser.email.split("@")[0] || "Anonymous";
    
    let recipeData = { ...data };
    let updatePayload = {
      title: data.title,
      time_of_cooking: data.time_of_cooking,
      ingredients: data.ingredients,
      instructions: data.instructions,
    };

    try {
      // Обробка фото
      if (imageFile) {
        const newImageUrl = await uploadFile(imageFile);
        updatePayload.imageUrl = newImageUrl;
      } else if (editingRecipe) {
        updatePayload.imageUrl = editingRecipe.imageUrl;
      } else {
        updatePayload.imageUrl = "assets/images/default-dish.png";
      }

      if (editingRecipe) {
        // Оновлення існуючого
        await updateRecipe(editingRecipe.id, updatePayload);

        setCurrentCards((prevCards) =>
          prevCards.map((card) =>
            card.id === editingRecipe.id
              ? { ...editingRecipe, ...updatePayload }
              : card
          )
        );
        alert("Рецепт успішно оновлено!");
      } else {
        // Створення нового (якщо allowCreation true)
        recipeData.authorId = currentUser.uid;
        recipeData.author = authorName;
        recipeData.imageUrl = updatePayload.imageUrl;
        
        const newRecipe = await createRecipe(
          recipeData,
          currentUser.uid,
          authorName,
          recipeData.imageUrl
        );

        setCurrentCards((prevCards) => [newRecipe, ...prevCards]);
        alert("Рецепт успішно створено!");
      }

      handleCloseModal();
    } catch (error) {
      console.error(
        `Помилка під час ${editingRecipe ? "оновлення" : "створення"} рецепта:`,
        error
      );
      alert(`Помилка: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddComment = async (recipeId, commentData) => {
    try {
      await addRecipeComment(recipeId, commentData);

      setCurrentCards((prevCards) =>
        prevCards.map((recipe) => {
          if (recipe.id === recipeId) {
            return {
              ...recipe,
              comments: [...(recipe.comments || []), commentData],
            };
          }
          return recipe;
        })
      );
    } catch (error) {
      console.error("Помилка додавання коментаря:", error);
      alert("Не вдалося додати коментар.");
    }
  };

  return (
    <section className="cards-block">
      <div className="block-header">
        <div className="text-container">
            <h3>{title}</h3>
            <hr />
        </div>
        
        {/* Перемикач виду (Grid/List) */}
        <div className="toggle-template">
            <i
            className={`fa-solid fa-braille ${
                viewMode === "grid" ? "active" : ""
            }`}
            onClick={() => setViewMode("grid")}
            ></i>
            <i
            className={`fa-solid fa-list ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            ></i>
        </div>
      </div>

      <div className={`category-cards ${viewMode === "list" ? "list-view" : ""}`}>
        {currentCards.map((card, index) => {
            // Визначаємо, чи є поточний юзер власником цієї картки
            const isOwner = currentUser && card.authorId === currentUser.uid;

            return (
                <Card
                    key={card.id || index}
                    data={card}
                    cardIndex={index}
                    isOpen={openCard === index} // Використовуємо index або card.id, залежно від вашої логіки відкриття
                    viewMode={viewMode}
                    isAdmin={isOwner} // Передаємо права, тільки якщо це автор
                    onOpen={() => setOpenedCard(index)}
                    onClose={() => setOpenedCard(null)}
                    onAddComment={handleAddComment}
                    onDelete={() => handleDelete(card.id)}
                    onEdit={handleEdit}
                />
            );
        })}

        {allowCreation && (
          <div className="add-new-card">
             <button 
                onClick={() => setIsModalOpen(true)}
                aria-label="Add New Recipe"
             >
                +
             </button>
          </div>
        )}
      </div>

      {/* Модальне вікно форми */}
      {isModalOpen && (
        <Form
          onSubmit={handleSave}
          onCancel={handleCloseModal}
          initialData={editingRecipe || {}}
          isSaving={isSaving}
        />
      )}
    </section>
  );
};

export default CardsBlock;