import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider'; // Ensure you import the context
import { getOrdersForUser } from '../lib/appwrite'; // Function to fetch orders
import OrderItem from '../components/OrderItem'; // Component to display individual orders

const Orders = () => {
  const { user } = useGlobalContext(); // Access user info from the context
  const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user || !user.accountId) {
        Alert.alert('Error', 'User not logged in.'); // Handle user not logged in
        setLoading(false);
        return;
      }
      
      try {
        const userOrders = await getOrdersForUser(user.accountId); // Pass user ID to fetch orders
        console.log('Fetched Orders:', userOrders); // Log fetched orders for debugging
        setOrders(userOrders || []); // Set orders, ensuring it is an array
      } catch (error) {
        console.error('Error fetching orders:', error); // Log the error for debugging
        Alert.alert('Error', 'Unable to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]); // Re-fetch orders when user changes

  if (loading) {
    return <ActivityIndicator size="large" color="#00bfff" />;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-teal-500 mb-4">Your Orders</Text>
      {orders.length === 0 ? (
        <Text className="text-center">No orders found!</Text>
      ) : (
        <ScrollView>
          {orders.map(order => (
            <OrderItem key={order.orderId} order={order} /> // Display each order
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Orders;
