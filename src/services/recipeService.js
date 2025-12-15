import { db } from "../../firebaseConfig";
import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    arrayUnion,
    arrayRemove,
    getDoc,
} from "firebase/firestore";

const recipesCollectionRef = collection(db, "recipes");

// =========================================================================
// R: READ (Читання)
// =========================================================================
export const getRecipes = async () => {
    try {
        const data = await getDocs(recipesCollectionRef);
        return data.docs.map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
        }));
    } catch (error) {
        console.error("Помилка читання рецептів:", error);
        throw error;
    }
};

// =========================================================================
// C: CREATE (Створення)
// =========================================================================
export const createRecipe = async (recipeData, userId, authorName, imageUrl) => {
    const recipeToSave = {
        ...recipeData,
        authorId: userId,
        author: authorName,
        imageUrl: imageUrl,
        createdAt: new Date().toISOString(),
        likes: 0,
        seen: 0,
        stars: 0,
        comments: [],
    };
    
    try {
        const docRef = await addDoc(recipesCollectionRef, recipeToSave);
        return { ...recipeToSave, id: docRef.id };
    } catch (error) {
        console.error("Помилка створення рецепта:", error);
        throw error;
    }
};

// =========================================================================
// U: UPDATE (Оновлення)
// =========================================================================
export const updateRecipe = async (recipeId, updatedFields) => {
    const recipeDoc = doc(db, "recipes", recipeId);
    
    try {
        await updateDoc(recipeDoc, updatedFields);
        console.log(`Рецепт ID ${recipeId} оновлено.`);
    } catch (error) {
        console.error("Помилка оновлення рецепта:", error);
        throw error;
    }
};

// =========================================================================
// D: DELETE (Видалення)
// =========================================================================
export const deleteRecipe = async (recipeId) => {
    const recipeDoc = doc(db, "recipes", recipeId);
    
    try {
        await deleteDoc(recipeDoc);
        console.log(`Рецепт ID ${recipeId} видалено.`);
    } catch (error) {
        console.error("Помилка видалення рецепта:", error);
        throw error;
    }
};

// =========================================================================
// ДОДАТКОВІ ФУНКЦІЇ
// =========================================================================
export const getUserRecipes = async (userId) => {
    if (!userId) return [];
    const userQuery = query(recipesCollectionRef, where("authorId", "==", userId));

    try {
        const data = await getDocs(userQuery);
        
        return data.docs.map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
        }));
    } catch (error) {
        console.error("Помилка завантаження рецептів користувача:", error);
        throw error;
    }
};

// =========================================================================
// ДОДАВАННЯ КОМЕНТАРЯ ДО РЕЦЕПТА
// =========================================================================
export const addRecipeComment = async (recipeId, commentData) => {
    try {
        const recipeDocRef = doc(db, "recipes", recipeId);
        await updateDoc(recipeDocRef, {
            comments: arrayUnion(commentData)
        });

        console.log(`Коментар додано до рецепта ID ${recipeId}`);
    } catch (error) {
        console.error("Помилка додавання коментаря:", error);
        throw new Error("Не вдалося додати коментар.");
    }
};

// =========================================================================
// ПЕРЕКЛЮЧЕННЯ ЛАЙКА КОМЕНТАРЯ
// =========================================================================
export const toggleCommentLike = async (recipeId, commentId, userId, isCurrentlyLiked) => {
    const recipeDocRef = doc(db, "recipes", recipeId);
    
    try {
        const docSnap = await getDoc(recipeDocRef);
        if (!docSnap.exists()) {
            throw new Error("Рецепт не знайдено.");
        }
        
        const recipeData = docSnap.data();
        let comments = recipeData.comments || [];

        comments = comments.map(comment => {
            if (comment.commentId === commentId) {
                const likers = new Set(comment.likers || []);
                let newLikesCount = comment.likesCount || 0;

                if (isCurrentlyLiked) {
                    likers.delete(userId);
                    newLikesCount = Math.max(0, newLikesCount - 1);
                } else {
                    likers.add(userId);
                    newLikesCount += 1;
                }

                return {
                    ...comment,
                    likers: Array.from(likers),
                    likesCount: newLikesCount,
                };
            }
            return comment;
        });

        await updateDoc(recipeDocRef, {
            comments: comments
        });
        
        console.log(`Лайк коментаря ${commentId} оновлено.`);
        return { success: true };

    } catch (error) {
        console.error("Помилка оновлення лайка коментаря:", error);
        throw new Error("Не вдалося оновити лайк коментаря.");
    }
};

// =========================================================================
// ПЕРЕКЛЮЧЕННЯ ЛАЙКА РЕЦЕПТА
// =========================================================================
export const toggleRecipeLike = async (recipeId, userId, isCurrentlyLiked) => {
    const recipeDocRef = doc(db, "recipes", recipeId);
    
    const arrayOperation = isCurrentlyLiked ? arrayRemove : arrayUnion;
    
    await updateDoc(recipeDocRef, {
        likers: arrayOperation(userId)
    });

    console.log(`Лайк рецепта ${recipeId} оновлено.`);
};

// =========================================================================
// ПЕРЕКЛЮЧЕННЯ ЗБЕРЕЖЕННЯ РЕЦЕПТА
// =========================================================================
export const toggleSavedRecipe = async (recipeId, userId, isCurrentlySaved) => {
    const recipeDocRef = doc(db, "recipes", recipeId);
    
    const arrayOperation = isCurrentlySaved ? arrayRemove : arrayUnion;

    await updateDoc(recipeDocRef, {
        savers: arrayOperation(userId)
    });

    console.log(`Статус збереження рецепта ${recipeId} оновлено.`);
};

// =========================================================================
// ОНОВЛЕННЯ РЕЙТИНГУ РЕЦЕПТА
// =========================================================================
export const rateRecipe = async (recipeId, userId, newRating) => {
    const recipeDocRef = doc(db, "recipes", recipeId);

    const ratingUpdate = {};
    ratingUpdate[`ratings.${userId}`] = newRating; 

    try {
        await updateDoc(recipeDocRef, ratingUpdate);
        console.log(`Рейтинг ${newRating} від користувача ${userId} збережено для рецепта ${recipeId}.`);
    } catch (error) {
        console.error("Помилка збереження рейтингу:", error);
        throw new Error("Не вдалося зберегти оцінку.");
    }
};