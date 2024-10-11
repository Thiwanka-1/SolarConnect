// CustomerFeedbackHelp.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const CustomerFeedbackHelp = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          
          {/* Title */}
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 }}>
            Customer Feedback Help
          </Text>

          {/* Image */}
          <Image
            source={images.helpFeedback}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          {/* Content */}
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          How to Submit Feedback: If you have suggestions or comments about our solar products or services, please visit our feedback page and fill out the form. Your input is valuable to us and helps improve our offerings.
          Where to Find Feedback Responses: After submitting your feedback, you can check our feedback responses section on the website to see how we have addressed customer concerns and implemented changes.
          Contacting Customer Support: If you have specific issues or concerns that require immediate assistance, please reach out to our customer support team via email or phone. We aim to respond within 24 hours.          </Text>

          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default CustomerFeedbackHelp;
