import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const { $id, quantity, productPrice, productName, productImage } = item;

  const handleIncreaseQuantity = () => {
    onUpdateQuantity($id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      onUpdateQuantity($id, quantity - 1);
    }
  };

  const displayPrice = productPrice ? (productPrice * quantity).toFixed(2) : '0.00';

  return (
    <View className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 flex-row items-center">
      <Image source={{ uri: productImage }} className="h-20 w-20 rounded-lg" />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold text-gray-800">{productName}</Text>
        <Text className="text-gray-600">Price: ${displayPrice}</Text>
        <View className="flex-row items-center mt-2">
          <TouchableOpacity onPress={handleDecreaseQuantity} className="bg-teal-500 rounded px-2 py-1">
            <Text className="text-white">-</Text>
          </TouchableOpacity>
          <Text className="mx-4">{quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity} className="bg-teal-500 rounded px-2 py-1">
            <Text className="text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onRemove($id)} className="bg-red-500 rounded px-2 py-1">
        <Text className="text-white">Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
