import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { updateFeedback, fetchFeedbackById } from '../lib/appwrite'; // Import necessary functions
import { useNavigation, useRoute } from '@react-navigation/native'; // Import navigation hooks

const UpdateFeedback = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Access the route object
  const { feedbackId } = route.params; // Get feedbackId from route params
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedback = await fetchFeedbackById(feedbackId); // Fetch feedback by ID
        setRating(feedback.rating);
        setComment(feedback.comment);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Unable to fetch feedback details.');
      }
    };

    fetchFeedback();
  }, [feedbackId]);

  const handleUpdate = async () => {
    try {
      await updateFeedback(feedbackId, { rating, comment });
      Alert.alert('Success', 'Feedback updated successfully');
      navigation.goBack(); // Navigate back after successful update
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error updating feedback');
    }
  };

  return (
    <View style={styles.container}>
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
        style={styles.textarea}
        value={comment}
        onChangeText={setComment}
        placeholder="Write your comment here..."
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the UpdateFeedback component
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 30,
    marginRight: 5,
    cursor: 'pointer', // Pointer for better UX (if not using mobile)
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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

export default UpdateFeedback;
