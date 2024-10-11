import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider'; // Import the context
import { addItemToCart, getCurrentUser , fetchCartItems} from '../lib/appwrite'; // Import the addItemToCart function
import { useRouter } from 'expo-router'; // Import the router

const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProduct } = useGlobalContext(); // Access the context
  const router = useRouter(); // Initialize router

  const handleAddToCart = async () => {
    const currentUser = await getCurrentUser(); // Ensure you get the current user
    if (currentUser && currentUser.accountId) {
      try {
        // Add item to the cart
        await addItemToCart(currentUser.accountId, product.productId, 1); // Adjust quantity as needed
        
        // Fetch updated cart items
        const updatedCartItems = await fetchCartItems(currentUser.accountId); // Make sure this function is defined
        addToCart(updatedCartItems); // Update the context with the new cart items
        
        Alert.alert('Success', 'Product added to cart successfully!'); // Show success message
      } catch (error) {
        console.error('Error adding to cart:', error);
        Alert.alert('Error', 'Failed to add product to cart'); // Show error message
      }
    } else {
      Alert.alert('Error', 'User not logged in');
    }
  };
  

  const handleGoToDetails = () => {
    setSelectedProduct(product); // Set the selected product in the context
    router.push('/productDetails'); // Navigate to ProductDetails page
  };

  return (
    <View className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
      <TouchableOpacity onPress={handleGoToDetails}>
        <Image source={{ uri: product.imageUrl }} className="h-40 w-full rounded-lg" />
      </TouchableOpacity>
      <Text className="text-lg font-semibold text-gray-800 mt-2">{product.name}</Text>
      <Text className="text-gray-600 mt-1">Price: ${product.price}</Text>
      <TouchableOpacity
        className="bg-teal-500 text-white rounded-lg p-2 mt-3"
        onPress={handleAddToCart} // Add product to cart
      >
        <Text className="text-center text-white font-bold">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
