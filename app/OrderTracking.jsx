import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const OrderTracking = () => {
  const route = useRoute();
  const { order } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Order Tracking</Text>
      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{order.p_name}</Text>
        <Text style={styles.productPrice}>$. {order.totalPrice}</Text>
        <Text style={styles.orderDate}>{new Date(order.orderDate).toDateString()}</Text>
      </View>

      <View style={styles.tracking}>
        
        <View style={styles.trackingItem}>
          <View style={styles.circleComplete} />
          <Text style={styles.trackingText}>01 september, 2024</Text>
          <Text style={styles.trackingLabel}>Confirm Order Details</Text>
        </View>

        <View style={styles.trackingItem}>
          <View style={styles.circlePending} />
          <Text style={styles.trackingText}>10 september, 2024</Text>
          <Text style={styles.trackingLabel}>Deliver</Text>
        </View>

        <View style={styles.trackingItem}>
          <View style={styles.circlePending} />
          <Text style={styles.trackingText}>15 september, 2024</Text>
          <Text style={styles.trackingLabel}>Paid</Text>
        </View>

        <View style={styles.trackingItem}>
          <View style={styles.circlePending} />
          <Text style={styles.trackingText}>20 september, 2024</Text>
          <Text style={styles.trackingLabel}>Complete Delivery</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d9488',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 1,
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14b8a6',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
  },
  tracking: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 1,
  },
  trackingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleComplete: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  circlePending: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  trackingText: {
    fontSize: 14,
    color: '#333',
    width: 80,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default OrderTracking;
