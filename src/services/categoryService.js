import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const categoriesCollectionRef = collection(db, "categories");

export const getCategories = async () => {
    try {
        const data = await getDocs(categoriesCollectionRef);
        const categories = data.docs.map(doc => ({ 
            ...doc.data(), 
            id: doc.id 
        }));

        return categories.sort((a, b) => {
            if (a.value === 'all') return -1;
            if (b.value === 'all') return 1;
            return a.label.localeCompare(b.label);
        });

    } catch (error) {
        console.error("Помилка завантаження категорій:", error);
        throw error;
    }
};