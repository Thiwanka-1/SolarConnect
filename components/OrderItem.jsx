import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('OrderTracking', { order }); // Navigate to the tracking page with order data
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <Text style={styles.productName}>Product Name: {order.p_name}</Text>
      <Text style={styles.status}>Status: {order.status}</Text>
      <Text style={styles.totalPrice}>Total Price: ${order.totalPrice.toFixed(2)}</Text>
      <Text style={styles.address}>Delivery Address: {order.deliveryAddress}</Text>
      <Text style={styles.contactNumber}>Contact: {order.contactNumber}</Text>
      <Text style={styles.productCount}>Total Items: {order.quantity}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 1,
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productName: {
    marginBottom: 5,
  },
  status: {
    marginBottom: 5,
  },
  totalPrice: {
    marginBottom: 5,
  },
  address: {
    marginBottom: 5,
  },
  contactNumber: {
    marginBottom: 5,
  },
  productCount: {
    marginBottom: 5,
  },
});

export default OrderItem;
