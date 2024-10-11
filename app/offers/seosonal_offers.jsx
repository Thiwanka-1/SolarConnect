// SeasonalOffers.jsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';

const SeasonalOffers = () => {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 50 }}>
            Seasonal Offers
          </Text>

          {/* Image */}
          <Image
            source={images.seasonalOffers}  
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"  
          />

          <Text style={{ fontSize: 18, color: '#000', textAlign: 'center', marginBottom: 30 }}>
          1. Spring Solar Special: For installations completed in March and April, enjoy a $1,000 rebate on your solar panel purchase, making it a great time to invest in renewable energy as the days get longer and sunnier.
          2. Summer Efficiency Upgrade: Upgrade your existing solar system this summer and receive a 15% discount on new panels or equipment, helping you maximize energy production during peak sunlight months.          </Text>


          <StatusBar backgroundColor='#161622' style='light' />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SeasonalOffers;
