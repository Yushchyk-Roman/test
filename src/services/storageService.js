const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = 'recipe_preset';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadFile = async (file) => {
    if (!file) {
        throw new Error("Файл не надано.");
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        console.log("Секс на криші");

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary Upload Error: ${errorData.error.message}`);
        }
        
        const data = await response.json();
console.log("Гандоніщє");
        return data.secure_url; 
        
    } catch (error) {
        console.error("Помилка завантаження файлу на Cloudinary:", error);
        throw new Error("Помилка завантаження зображення.");
    }
};