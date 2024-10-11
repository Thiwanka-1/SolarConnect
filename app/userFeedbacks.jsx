import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { fetchUserFeedbacks, deleteFeedback } from '../lib/appwrite'; // Import necessary functions
import { useRouter } from 'expo-router'; // Import the router for navigation

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const router = useRouter(); // Initialize router

  // Fetch feedbacks for the current user
  const loadFeedbacks = async () => {
    try {
      const userFeedbacks = await fetchUserFeedbacks(); // Fetch feedbacks for the current user
      setFeedbacks(userFeedbacks); // Update state with fetched feedbacks
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to fetch feedbacks');
    }
  };

  // Fetch feedbacks when component mounts
  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await deleteFeedback(feedbackId); // Call delete function
      setFeedbacks(feedbacks.filter(feedback => feedback.$id !== feedbackId)); // Update state
      Alert.alert('Success', 'Feedback deleted successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error deleting feedback');
    }
  };

  const handleUpdateFeedback = (feedback) => {
    // Navigate to the update feedback page with feedback ID
    router.push(`/updateFeedback?feedbackId=${feedback.$id}`); // Ensure this matches your routing structure
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>My Feedbacks</Text>
      <ScrollView>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <View key={feedback.$id} style={styles.feedbackCard}>
              <Text style={styles.ratingText}>Rating: {feedback.rating} ★</Text>
              <Text style={styles.commentText}>Comment: {feedback.comment}</Text>
              <Text style={styles.dateText}>Date: {new Date(feedback.date).toLocaleDateString()}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => {
                    console.log('Navigating to updateFeedback with ID:', feedback.$id);
                    handleUpdateFeedback(feedback); // Call update handler
                  }}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteFeedback(feedback.$id)} // Call delete function
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', margin: 20 }}>No feedback found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  feedbackCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  commentText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#4CAF50', // Green
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#F44336', // Red
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserFeedback;
