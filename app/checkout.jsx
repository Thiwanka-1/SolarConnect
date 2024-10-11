import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { createOrder, fetchCartItems } from '../lib/appwrite'; // Import order creation function
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Checkout = () => {
  const navigation = useNavigation(); // Get the navigation object
  const { user } = useGlobalContext(); // Access user info
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    // Auto-fill name and email
    if (user) {
      setName(user.cus_name || ''); // Assuming cus_name holds the user's name
      setEmail(user.email || ''); // Assuming user.email holds the user's email
      setContactNumber(user.contactNumber || ''); // Assuming contactNumber exists in user data
    }
  }, [user]);

  useEffect(() => {
    const loadCartItems = async () => {
      const currentUser = user.accountId; // Get the current user's ID
      if (currentUser) {
        try {
          const items = await fetchCartItems(currentUser);
          setCartItems(items); // Set cart items
          console.log('Cart Items:', items); // Log cart items for debugging
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Unable to fetch cart items');
        }
      }
    };

    loadCartItems(); // Fetch cart items on component mount
  }, [user]); // Fetch when the user changes

  const handleCheckout = async () => {
    if (!address || !contactNumber) {
      Alert.alert('Error', 'Please provide your address and contact number');
      return;
    }
  
    console.log('User ID:', user.accountId);
    console.log('Cart Items:', cartItems); // Check cart items
    console.log('Address:', address);
    console.log('Contact Number:', contactNumber);
  
    try {
      const orderDetails = await createOrder(user.accountId, cartItems, address, contactNumber);
      Alert.alert('Success', 'Order placed successfully!');
      
      // Pass the entire orderDetails object to the OrderSummary screen
      navigation.navigate('OrderSummary', { order: orderDetails });
    } catch (error) {
      console.error('Error during checkout:', error);
      Alert.alert('Error', 'Failed to place order');
    }
  };
  

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-teal-500 mb-4">Checkout</Text>
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Name"
        value={name}
        editable={false} // Make this field read-only
      />
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Email"
        value={email}
        editable={false} // Make this field read-only
      />
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter your delivery address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Enter your contact number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <Button title="Confirm Order" onPress={handleCheckout} />
    </View>
  );
};

export default Checkout;
