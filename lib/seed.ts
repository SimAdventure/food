import { ID } from "react-native-appwrite";
import { AppWriteConfig, database, storage } from "./AppWrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface additives {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    additives: string[]; // list of additives names
}

interface DummyData {
    categories: Category[];
    additives: additives[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    const list = await database.listDocuments(
        AppWriteConfig.databaseId,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            database.deleteDocument(AppWriteConfig.databaseId, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(AppWriteConfig.bucketId);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(AppWriteConfig.bucketId, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
        uri: imageUrl,
    };

    const file = await storage.createFile(
        AppWriteConfig.bucketId,
        ID.unique(),
        fileObj
    );

    return storage.getFileViewURL(AppWriteConfig.bucketId, file.$id);
}

async function seed(): Promise<void> {
    // 1. Clear all
    await clearAll(AppWriteConfig.categoriesCollectionId);
    await clearAll(AppWriteConfig.additivesCollectionId);
    await clearAll(AppWriteConfig.menuCollectionId);
    await clearAll(AppWriteConfig.menuAdditivesCollectionId);
    await clearStorage();

    // 2. Create Categories
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        const doc = await database.createDocument(
            AppWriteConfig.databaseId,
            AppWriteConfig.categoriesCollectionId,
            ID.unique(),
            cat
        );
        categoryMap[cat.name] = doc.$id;
    }

    // 3. Create additivess
    const additivesMap: Record<string, string> = {};
    for (const cus of data.additives) {
        const doc = await database.createDocument(
            AppWriteConfig.databaseId,
            AppWriteConfig.additivesCollectionId,
            ID.unique(),
            {
                name: cus.name,
                price: cus.price,
                type: cus.type,
            }
        );
        additivesMap[cus.name] = doc.$id;
    }

    // 4. Create Menu Items
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        const uploadedImage = await uploadImageToStorage(item.image_url);

        const doc = await database.createDocument(
            AppWriteConfig.databaseId,
            AppWriteConfig.menuCollectionId,
            ID.unique(),
            {
                name: item.name,
                description: item.description,
                image_url: uploadedImage,
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                protein: item.protein,
                categories: categoryMap[item.category_name],
            }
        );

        menuMap[item.name] = doc.$id;

        // 5. Create menu_additivess
        for (const cusName of item.additives) {
            await database.createDocument(
                AppWriteConfig.databaseId,
                AppWriteConfig.menuAdditivesCollectionId,
                ID.unique(),
                {
                    menu: doc.$id,
                    additivess: additivesMap[cusName],
                }
            );
        }
    }

    console.log("✅ Seeding complete.");
}

export default seed;
