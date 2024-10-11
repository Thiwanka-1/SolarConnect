import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createFeedback, getCurrentUser } from '../lib/appwrite'; // Import the function
import { router } from 'expo-router'; // Import the router for navigation

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState(new Date().toISOString()); // Set default to current date

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserName(user.cus_name); // Assuming `cus_name` is the field for the user's name
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      await createFeedback(userName, { rating, comment, date });
      Alert.alert('Success', 'Feedback submitted successfully');
      // Redirect to FeedbackList page after submission
      router.push('/feedback'); // Adjust the path according to your routing structure
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error submitting feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.textInput}
        value={userName}
        editable={false} // Prevent the user from editing their name
      />

      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.textInput}
        value={new Date(date).toLocaleDateString()} // Format the date to a readable format
        editable={false} // Prevent the user from editing the date
      />
      
      <Text style={styles.label}>Rate:</Text>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
            <Text style={styles.star}>{index + 1 <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Comment:</Text>
      <TextInput
        style={styles.textInput}
        value={comment}
        onChangeText={setComment}
        placeholder="Write your comment here..."
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the form and components
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  star: {
    fontSize: 32,
    marginRight: 4,
    color: '#FFD700', // Gold color for selected stars
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#6200EA',
    borderRadius: 5,
    alignItems: 'center',
    padding: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackForm;
