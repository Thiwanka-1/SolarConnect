import { Client, Account, Avatars, Databases, ID, Query, Storage } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
      platform: 'com.sliit.solar',
      projectId: '66eea9c9002724d6ea77',
      databaseId: '66eebcb4000775c9fd39',
      userCollectionId: '66eebcff0022597404d7',
      solarCollectionId: '6704ccd10014eb71fa42',
      storageId: '66eebd47000b3a5a0598',
  };

  const client = new Client();
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  const storage = new Storage(client);


  client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

  const account = new Account(client);

  export async function createUser(email, password, cus_name, username){
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            cus_name,
            username,
        );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        cus_name: cus_name,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;

    }catch (error) {
        throw new Error(error);
      }
  }

  export async function saveSolarCalculation(userId, propertyType, systemSize, monthlyUsage, sunlightHours, costPerKwh, installationCost, annualSavings, breakEvenPeriod) {
    try {
      const newCalculation = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.solarCollectionId, // Save in the solarCalculations collection
        ID.unique(),
        {
          userId: userId, // Save the user's ID
          propertyType: propertyType,
          systemSize: parseFloat(systemSize),
          monthlyUsage: parseFloat(monthlyUsage),
          sunlightHours: parseFloat(sunlightHours),
          costPerKwh: parseFloat(costPerKwh),
          installationCost: parseFloat(installationCost),
          annualSavings: parseFloat(annualSavings),
          breakEvenPeriod: parseFloat(breakEvenPeriod),
        }
      );
      return newCalculation;
    } catch (error) {
      throw new Error(`Failed to save solar calculation: ${error.message}`);
    }
  }

  export async function signIn(email, password) {
    try {
      // Check if a session is already active
      const currentSession = await account.get();
      if (currentSession) {
        // Optionally, you can decide whether to log out the session or use the existing one
        Alert.alert("Session Active", "You are already logged in.");
        return currentSession; // Skip login and return existing session
      }
    } catch (error) {
      // No active session, safe to proceed with login
    }
  
    try {
      // Create a new session
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }

 export async function getAccount() {
    try {
       const currentAccount = await account.get();
  
       return currentAccount;
    } catch (error) {
       throw new Error(error);
     }
}
  
//   // Get Current User
   export async function getCurrentUser() {
     try {
       const currentAccount = await getAccount();
       if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal("accountId", currentAccount.$id)]
       );
  
       if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
       return null;
     }
   }
  
   // Sign Out
   export async function signOut() {
     try {
       const session = await account.deleteSession("current");
  
       return session;
     } catch (error) {
       throw new Error(error);
     }
   }

   export async function getUserData() {
    try {
      // Get the logged-in user's account data
      const accountData = await account.get();
  
      // Now fetch the additional data (e.g., username) from your user collection in the database
      const userDocument = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', accountData.$id)]  // Assuming you have an `accountId` field in your collection
      );
  
      // Return the combined data
      return {
        name: accountData.name,
        email: accountData.email,
        username: userDocument.documents.length > 0 ? userDocument.documents[0].username : null,  // Get the username
      };
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  }

 // Update user profile (name, email, and username)
 export async function updateUserProfile(name, email, username) {
    try {
      // Update the user's name (can be done without the password)
      if (name) {
        await account.updateName(name);
      }
  
      // Update the username in your custom collection
      const currentUser = await getCurrentUser();
      if (username) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          currentUser.$id, // Use the document ID from your collection
          { username } // Update the username field
        );
      }
  
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }
  
  
  
  // Change the user's password
  export async function changePassword(currentPassword, newPassword) {
    try {
      // Use Appwrite's account update method for password change
      await account.updatePassword(newPassword, currentPassword);
    } catch (error) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
  }
  
  export async function getSolarCalculations(userId) {
    try {
      const calculations = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.solarCollectionId,
        [Query.equal('userId', userId)] // Get only the logged-in user's calculations
      );
      return calculations.documents;
    } catch (error) {
      throw new Error(`Failed to fetch solar calculations: ${error.message}`);
    }
  }


