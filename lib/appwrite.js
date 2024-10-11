import {
  Client,
  Account,
  Avatars,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

import { Alert } from "react-native"; // Ensure Alert is imported here

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sliit.solar",
  projectId: "66eea9c9002724d6ea77",
  databaseId: "66eebcb4000775c9fd39",
  userCollectionId: "66eebcff0022597404d7",
  solarCollectionId: "6704ccd10014eb71fa42",
  storageId: "66eebd47000b3a5a0598",
  contactId: "67071c67000bdb6ab659", 
  feedbackCollectionId: '6704d53000291de95417',
  locationCollectionId: '670653e8002afda0839e',
  cartCollectionId: '6708d49c0039a9dfe2fd',  // Replace with actual ID
  ordersCollectionId: '6708d50b002d4ce2a211',  // Replace with actual ID
  solarProductsCollectionId: '6708d3bc002b92717ce7',  // Replace with actual ID
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

export async function createUser(email, password, cus_name, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      cus_name,
      username
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
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveSolarCalculation(
  userId,
  propertyType,
  systemSize,
  monthlyUsage,
  sunlightHours,
  costPerKwh,
  installationCost,
  annualSavings,
  breakEvenPeriod
) {
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
      [Query.equal("accountId", accountData.$id)] // Assuming you have an `accountId` field in your collection
    );

    // Return the combined data
    return {
      accountId: accountData.$id,
      name: accountData.name,
      email: accountData.email,
      username:
        userDocument.documents.length > 0
          ? userDocument.documents[0].username
          : null, // Get the username
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

export async function deleteAccount() {
  try {
    const currentSession = await account.getSession("current");
    if (!currentSession) {
      throw new Error("No active session found. Please log in.");
    }

    const response = await fetch(`https://cloud.appwrite.io/v1/account`, {
      method: "DELETE",
      headers: {
        "X-Appwrite-Project": appwriteConfig.projectId,
        "X-Appwrite-API-Key": "standard_aae8a6bc834c6c9b650eaded8b9c64fb400710a5eb45959385b227202f908a0e1676d64f49352d838cecfa5cd0c7767f36179c7a6f11a1f68da6404ce394a85cf3583432c3e4cec13e517f8be00bdde2322835426155f01328bc0cb034db62dc3e66836d92fb4e16873967af8123bd6c10c80a9edb320f0cfb22a4ce1d9129d0", // Replace with your actual API key
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete account.");
    }

    return true; // Indicate successful deletion
  } catch (error) {
    throw new Error(`Failed to delete account: ${error.message}`);
  }
}







export async function getSolarCalculations(userId) {
  try {
    const calculations = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.solarCollectionId,
      [Query.equal("userId", userId)] // Get only the logged-in user's calculations
    );
    return calculations.documents;
  } catch (error) {
    throw new Error(`Failed to fetch solar calculations: ${error.message}`);
  }
}

//Contacts
export async function createContact(
  service_type,
  product_type,
  contactNo,
  location,
  date,
  message,
  userAccountId
) {
  try {
    const userDocument = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userAccountId)]
    );

    if (!userDocument.documents.length) {
      throw new Error("User not found");
    }

    const userId = userDocument.documents[0].$id;
    const contactId = ID.unique();

    const newContact = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contactId,
      contactId,
      {
        contactId,
        service_type,
        product_type,
        contactNo,
        location,
        date,
        message,
        status: "Pending",
        user: userId,
      }
    );

    return newContact;
  } catch (error) {
    console.error("Error during contact creation:", error);
    throw new Error(`Failed to create contact: ${error.message}`);
  }
}

export async function getContactsByUser(userAccountId) {
  try {
    const userDocument = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", userAccountId)]
    );

    if (!userDocument.documents.length) {
      throw new Error("User not found");
    }

    const userId = userDocument.documents[0].$id;

    const contacts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contactId,
      [Query.equal("user", userId)]
    );

    return contacts.documents;
  } catch (error) {
    console.error("Error fetching contacts for user:", error);
    throw new Error(`Failed to fetch contacts: ${error.message}`);
  }
}

export async function removeContactById(contactId) {
  try {
    const deletedContact = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contactId,
      contactId
    );
    return deletedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error(`Failed to delete contact: ${error.message}`);
  }
}

export async function updateContact(
  contactId, // The ID of the contact you want to update
  updatedData // An object containing the updated fields
) {
  try {
    // Update the contact document in the Appwrite database
    const updatedContact = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contactId,
      contactId, // The contact ID you want to update
      updatedData // Object with the updated fields
    );
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error(`Failed to update contact: ${error.message}`);
  }
}

//feedback

export async function createFeedback(userId, feedbackData) {
  try {
    const newFeedback = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      ID.unique(),  // Generates a unique ID for the feedback document
      {
        userId: userId, // Store the user's ID (or name) correctly
        rating: feedbackData.rating,
        comment: feedbackData.comment,
        date: feedbackData.date, // Use the date passed from the form
      }
    );
    return newFeedback;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw new Error('Failed to create feedback.');
  }
}




//fetch feedback
export async function fetchAllFeedbacks() {
try {
  const feedbackList = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId
  );
  return feedbackList.documents;
} catch (error) {
  console.error('Error fetching feedbacks:', error);
  throw new Error('Failed to fetch feedbacks.');
}
}

//update feedbacks
export async function updateFeedback(feedbackId, feedbackData) {
try {
  const updatedFeedback = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId,
    feedbackId,
    {
      rating: feedbackData.rating,
      comment: feedbackData.comment,
    }
  );
  return updatedFeedback;
} catch (error) {
  console.error('Error updating feedback:', error);
  throw new Error('Failed to update feedback.');
}
}

//delete feedbacks
export async function deleteFeedback(feedbackId) {
try {
  await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId,
    feedbackId
  );
} catch (error) {
  console.error('Error deleting feedback:', error);
  throw new Error('Failed to delete feedback.');
}
}


// **New Function: Search for Location Suitability**
export async function searchLocation(province, district, town) {
try {
  const results = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.locationCollectionId,
    [
      Query.equal('province', province),
      Query.equal('district', district),
      Query.equal('town', town),
    ]
  );

  // Return the matching location details
  return results.documents;
} catch (error) {
  console.error('Error fetching location details:', error);
  throw new Error('Location not found or an error occurred.');
}
}

// **New Function: Add New Location (Admin functionality)** 
export async function addLocation(province, district, town, suitability, otherDetails) {
try {
  const location = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.locationCollectionId,
    ID.unique(),
    {
      province: province,
      district: district,
      town: town,
      suitability: suitability,
      otherDetails: otherDetails,
    }
  );

  return location;
} catch (error) {
  console.error('Error adding new location:', error);
  throw new Error('Failed to add location.');
}
}


// Fetch all feedbacks by the current user
// appwrite.js

// Fetch feedbacks by user ID
export async function fetchFeedbacksByUserId(userId) {
try {
  const feedbacks = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId,
    [Query.equal("userId", userId)] // Assuming userId is used to filter
  );
  return feedbacks.documents; // Return the list of feedbacks
} catch (error) {
  console.error('Error fetching user feedbacks:', error);
  throw new Error('Failed to fetch user feedbacks.');
}
}


// Fetch feedback by ID
// Fetch feedback by ID
export async function fetchFeedbackById(feedbackId) {
try {
  const response = await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId, // Ensure this is your correct feedback collection ID
    feedbackId // Pass the documentId (which is feedbackId here)
  );
  return response; // Return the fetched feedback
} catch (error) {
  console.error(`Failed to fetch feedback: ${error.message}`);
  throw new Error(`Failed to fetch feedback: ${error.message}`);
}
}


// Fetch all feedback for the current user
export async function fetchUserFeedbacks() {
try {
  const currentUser = await getCurrentUser(); // Get the current user details
  const feedbacks = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.feedbackCollectionId,
    [Query.equal('userId', currentUser.cus_name)] // Assuming `cus_name` is used as userId
  );

  return feedbacks.documents; // Return the list of feedbacks
} catch (error) {
  console.error('Error fetching user feedbacks:', error);
  throw new Error('Failed to fetch user feedbacks.');
}
}


// Add a new product
export async function addProduct(productData) {
  try {
    const newProduct = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.solarProductsCollectionId, // Your Products collection ID
      ID.unique(),
      {
        productId: ID.unique(), // Unique product ID
        name: productData.name,
        description: productData.description,
        price: productData.price,
        imageUrl: productData.imageUrl,
        stockQuantity: productData.stockQuantity,
        category: productData.category,
      }
    );
    return newProduct; // Return the created product
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product.');
  }
}

// Get all products
export async function getAllProducts() {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.solarProductsCollectionId // Your Products collection ID
    );
    return products.documents; // Return the list of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products.');
  }
}

// Get product by ID
export async function getProductById(productId) {
  try {
    const products = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.solarProductsCollectionId, // Collection for products
      [Query.equal('productId', productId)] // Query using the custom productId field
    );
    
    if (products.documents.length === 0) {
      throw new Error(`Product with productId: ${productId} not found`);
    }

    return products.documents[0]; // Return the first matching product
  } catch (error) {
    console.error(`Failed to fetch product: ${error.message}`);
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}



// Add item to cart
// appwrite.js

// Add item to cart
export async function addItemToCart(userId, productId, quantity) {
  try {
    const existingCartItem = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      [Query.equal('userId', userId), Query.equal('productId', productId)]
    );

    if (existingCartItem.documents.length > 0) {
      const cartItemId = existingCartItem.documents[0].$id;
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartCollectionId,
        cartItemId,
        { quantity: existingCartItem.documents[0].quantity + quantity }
      );
    } else {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartCollectionId,
        ID.unique(),
        {
          userId: userId,
          productId: productId,
          quantity: quantity,
          addedDate: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw new Error('Failed to add item to cart.');
  }
}


// Fetch user's cart items
export async function fetchCartItems(userId) {
  if (!userId) {
    throw new Error("User ID is required to fetch cart items.");
  }

  try {
    const cartItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      [Query.equal("userId", userId)]
    );

    const products = await Promise.all(cartItems.documents.map(async (item) => {
      try {
        const product = await getProductById(item.productId); // Fetch product by custom productId field

        return {
          ...item,
          productName: product.name,
          productImage: product.imageUrl,
          productPrice: product.price,
        };
      } catch (error) {
        console.error(`Failed to fetch product for cart item (ID: ${item.productId}): ${error.message}`);
        return {
          ...item,
          productName: 'Product Not Found',
          productImage: 'https://via.placeholder.com/150', // Fallback image
          productPrice: 0.00,
        };
      }
    }));

    return products; // Return the list of cart items with product details
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error('Failed to fetch cart items.');
  }
}
// Update cart item quantity
export async function updateCartItemQuantity(cartItemId, newQuantity) {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      cartItemId,
      { quantity: newQuantity }
    );
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    throw new Error('Failed to update cart item quantity.');
  }
}


export async function removeItemFromCart(cartItemId) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      cartItemId
    );
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw new Error('Failed to remove item from cart.');
  }
}




// Create a new order
// Update createOrder function to accept totalPrice
export async function createOrder(userId, cartItems, address, contactNumber) {
  try {
    // Calculate total price for the entire order
    const totalPrice = cartItems.reduce((total, item) => {
      return total + (item.productPrice * item.quantity);
    }, 0);

    // Create an order for each product in the cart
    const orderPromises = cartItems.map(async (item) => {
      const orderId = ID.unique(); // Generate a unique order ID for this order
      const orderDetails = {
        orderId: orderId, // Assign the generated order ID
        userId: userId,
        productId: item.productId,
        p_name: item.productName,
        quantity: item.quantity,
        totalPrice: item.productPrice * item.quantity,
        orderDate: new Date().toISOString(),
        status: 'Pending',
        deliveryAddress: address,
        contactNumber: contactNumber,
      };

      // Create the order in Appwrite
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        orderId, // Use the generated order ID as the document ID
        orderDetails
      );

      return orderDetails; // Return order details for this item
    });

    // Wait for all order creations to complete
    const orders = await Promise.all(orderPromises);

    // Clear the cart after successful order creation
    await Promise.all(cartItems.map(item => removeItemFromCart(item.$id)));

    // Return a summary of the orders created
    return {
      orderId: orders.map(order => order.orderId), // Retrieve the orderId from each order
      userId: userId,
      products: orders, // Collect all orders
      totalPrice: totalPrice,
      deliveryAddress: address,
      contactNumber: contactNumber,
      status: 'Pending',
    };
  } catch (error) {
    console.error('Error creating order:', error.message || error);
    throw new Error('Failed to create order.');
  }
}




export async function getOrderDetails(orderId) {
  if (!orderId) {
    throw new Error("Order ID is required to fetch order details."); // Ensure orderId is provided
  }
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      orderId // This should be the actual orderId
    );
    return response; // Return the order details
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error('Failed to fetch order details');
  }
}


// Get all orders for a user
export async function getOrdersForUser(userId) {
  if (!userId) {
    throw new Error("User ID is required to fetch orders.");
  }

  try {
    const orders = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId, // Your Orders collection ID
      [Query.equal('userId', userId)]
    );
    return orders.documents; // Return the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders.');
  }
}

// Update order status
export async function updateOrderStatus(orderId, status) {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId, // Your Orders collection ID
      orderId,
      { status: status, updatedDate: new Date().toISOString() } // Update order status
    );
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status.');
  }
}
