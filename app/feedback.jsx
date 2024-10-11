import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; 
import { fetchAllFeedbacks } from '../lib/appwrite'; 
import { router } from 'expo-router';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackList = await fetchAllFeedbacks();
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error(error);
        alert('Error fetching feedbacks');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 16 }}>All Feedbacks</Text>
      <ScrollView>
        {feedbacks.map((feedback) => (
          <View key={feedback.$id} style={styles.feedbackCard}>
            <Text style={styles.ratingText}>Name: {feedback.userId} </Text>
            <Text style={styles.ratingText}>Rating: {feedback.rating} ★</Text>
            <Text style={styles.commentText}>Comment: {feedback.comment}</Text>
            <Text style={styles.dateText}>Date: {new Date(feedback.date).toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/giveFeedback')}
      >
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  feedbackCard: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
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
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#6200EA',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    right: 30,
    elevation: 8,
  },
  plusText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default FeedbackList;
