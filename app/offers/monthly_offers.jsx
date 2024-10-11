// MonthlyOffers.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const MonthlyOffers = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          
          {/* Title */}
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 }}>
            Monthly Offers
          </Text>
          
          {/* Image */}
          <Image
            source={images.monthlyOffers}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          {/* Offer Details */}
          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          1.October Solar Savings: Enjoy a 20% discount on installation fees if you sign up by the end of the month. This limited-time offer is perfect for homeowners looking to reduce their electricity bills before winter.
          2.Free Maintenance for 6 Months: Sign up for a solar panel installation this month and receive 6 months of free maintenance services, including system checks and cleaning.          </Text>

          

          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MonthlyOffers;
