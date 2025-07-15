import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";


export const AppWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    plartform: "com.lonwaboitsolutions.foodspaza",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: "KasilethuFoodSpaza369",
    userCollectionId: "687555190022b49959b1"
}



// Initialize the AppWrite Client
export const client = new Client();
// Set the endpoint and project ID for the AppWrite
client
    .setEndpoint(AppWriteConfig.endpoint)
    .setProject(AppWriteConfig.projectId)
    .setPlatform(AppWriteConfig.plartform)

export const account = new Account(client);
export const database = new Databases(client);
const avatars = new Avatars(client);
// Create a new user in AppWrite and store their details in the database
export const createUser = async ({name, email, password}: CreateUserPrams) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        if(!newAccount) throw Error
        await signIn ({email, password})
        // Generate an avatar URL using the user's initials
        const avatarUrl = avatars.getInitials(name, 128)
        // Create a new user document in the database
        return await database.createDocument(
            AppWriteConfig.databaseId, 
            AppWriteConfig.userCollectionId, 
            ID.unique(), 
            {
                accountId: newAccount.$id,
                name: name,
                email: email,
                avatars: avatarUrl 
            }
        );
        
    } catch (e) {
       throw new Error(e as string) 
    }
}

// Sign In User with Email and Password
export const signIn = async ({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (e) {
        throw new Error(e as string);
    }
}

//Get Usser Details from AppWrite
export const getCurrentUser = async () => {
    try {
        // Get the current account
        // This will throw an error if the user is not logged in
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        // List documents in the user collection where accountId matches the current user's ID
        const currentUser = await database.listDocuments(
            AppWriteConfig.databaseId,
            AppWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        throw new Error(error as string);
    }
}