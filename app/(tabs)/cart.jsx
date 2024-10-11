import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { fetchCartItems, removeItemFromCart, updateCartItemQuantity, getCurrentUser } from '../../lib/appwrite';
import CartItem from '../../components/CartItem';
import { router } from 'expo-router';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadCartItems = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser && currentUser.accountId) {
          try {
            const items = await fetchCartItems(currentUser.accountId);
            setCartItems(items);
            calculateTotal(items);
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Unable to fetch cart items');
          }
        } else {
          Alert.alert('Error', 'User is not logged in');
        }
        setLoading(false);
      };

      loadCartItems();
    }, []) // Fetch cart items when the component is focused
  );

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (item.productPrice ? item.productPrice * item.quantity : 0), 0);
    setTotal(totalAmount);
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeItemFromCart(cartItemId);
      setCartItems(cartItems.filter(item => item.$id !== cartItemId));
      calculateTotal(cartItems);
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Failed to remove item from cart');
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity(cartItemId, newQuantity);
      const updatedItems = cartItems.map(item =>
        item.$id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update item quantity');
    }
  };

  const handleCheckout = () => {
    router.push("/checkout"); // Ensure 'Checkout' is the correct route name
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00bfff" />;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-teal-500 mb-4">Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text className="text-center">Your cart is empty!</Text>
      ) : (
        <ScrollView>
          {cartItems.map(item => (
            <CartItem 
              key={item.$id} 
              item={item} 
              onRemove={handleRemoveItem} 
              onUpdateQuantity={handleUpdateQuantity} 
            />
          ))}
        </ScrollView>
      )}
      <Text className="text-lg font-semibold mt-4">Total: ${total.toFixed(2)}</Text>
      <Button title="Checkout" onPress={handleCheckout} color="teal" />
    </View>
  );
};

export default Cart;
