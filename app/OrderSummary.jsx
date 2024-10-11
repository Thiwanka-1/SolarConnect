import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const OrderSummary = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params; // Get the entire order object from route params

  if (!order) {
    return <Text>Loading...</Text>; // Show a loading state if order is not available
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold text-black mb-4">Order Summary</Text>
      <Text className="text-lg font-semibold text-black">Order ID: <Text className="font-normal">{order.orderId || 'N/A'}</Text></Text>
      <Text className="text-lg font-semibold text-black">Status: <Text className="font-normal">{order.status || 'N/A'}</Text></Text>
      <Text className="text-lg font-semibold text-black">Total Items: <Text className="font-normal">{order.products.length || 0}</Text></Text>
      <Text className="text-lg font-semibold text-black">Delivery Address: <Text className="font-normal">{order.deliveryAddress || 'N/A'}</Text></Text>
      <Text className="text-lg font-semibold text-black">Contact Number: <Text className="font-normal">{order.contactNumber || 'N/A'}</Text></Text>
      
      <TouchableOpacity
        className="bg-teal-500 rounded-md p-3 mt-6"
        onPress={() => navigation.navigate('home')} // Navigate to the home page
      >
        <Text className="text-white text-center text-lg font-bold">Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummary;
