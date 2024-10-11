import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider'; // Access global context
import { addItemToCart } from '../lib/appwrite'; // Import necessary functions

const ProductDetails = () => {
  const { selectedProduct, user } = useGlobalContext(); // Access selected product and user from context
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const currentUser = await getCurrentUser(); // Ensure you get the current user
    if (currentUser && currentUser.accountId) {
      try {
        await addItemToCart(currentUser.accountId, product.productId, 1); // Adjust quantity as needed
        addToCart(product); // Update cart in context
        Alert.alert('Success', 'Product added to cart successfully!'); // Show success message
      } catch (error) {
        console.error('Error adding to cart:', error);
        Alert.alert('Error', 'Failed to add product to cart'); // Show error message
      }
    } else {
      Alert.alert('Error', 'User not logged in');
    }
  };
  

  if (!selectedProduct) {
    return <Text>No product selected.</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Image source={{ uri: selectedProduct.imageUrl }} className="h-60 w-full rounded-lg" />
      <Text className="text-2xl font-bold mt-4">{selectedProduct.name}</Text>
      <Text className="text-lg mt-2">Price: ${selectedProduct.price}</Text>
      <Text className="text-gray-700 mt-2">{selectedProduct.description}</Text>
      <TouchableOpacity
        className="bg-teal-500 p-2 rounded-lg mt-4"
        onPress={handleAddToCart}>
        <Text className="text-center text-white font-bold">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;
